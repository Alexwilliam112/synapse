package main

import (
	"encoding/json"
	"fmt"
	"sync"
)

func ClusterMiner(events []Event) []map[string]interface{} {
	clusters := make(map[string][]Event)
	var mu sync.Mutex
	var wg sync.WaitGroup

	// Create a worker function
	worker := func(events []Event) {
		defer wg.Done()
		localClusters := make(map[string][]Event)
		for _, event := range events {
			processName := event.ProcessName
			localClusters[processName] = append(localClusters[processName], event)
		}

		// Merge localClusters into the main clusters map
		mu.Lock()
		for processName, eventLog := range localClusters {
			clusters[processName] = append(clusters[processName], eventLog...)
		}
		mu.Unlock()
	}

	// Divide events into smaller chunks for concurrent processing
	numWorkers := 4 // You can adjust this based on your requirement
	chunkSize := (len(events) + numWorkers - 1) / numWorkers

	for i := 0; i < len(events); i += chunkSize {
		end := i + chunkSize
		if end > len(events) {
			end = len(events)
		}
		wg.Add(1)
		go worker(events[i:end])
	}

	wg.Wait()

	var result []map[string]interface{}
	for processName, eventLog := range clusters {
		cluster := map[string]interface{}{
			"processName": processName,
			"eventlog":    eventLog,
		}
		result = append(result, cluster)
	}

	// Log the clustered results
	logClusterResults(result)

	return result
}

func logClusterResults(results []map[string]interface{}) {
	for _, cluster := range results {
		jsonCluster, err := json.MarshalIndent(cluster, "", "  ")
		if err != nil {
			fmt.Println("Error marshalling cluster results:", err)
			continue
		}
		fmt.Println(string(jsonCluster))
	}
}
