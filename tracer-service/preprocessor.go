package main

import "fmt"

// Preprocessor merges process clusters that contain fewer processes into clusters with more processes
// only if the smaller cluster contains at least one process in common with the larger cluster.
func Preprocessor(traceResults []map[string]interface{}) []map[string]interface{} {
	mergedClusters := make([]map[string]interface{}, 0)
	processed := make(map[int]bool) // to keep track of processed clusters

	for i := 0; i < len(traceResults); i++ {
		if processed[i] {
			continue
		}

		mainCluster := traceResults[i]
		mainProcesses := convertToStringSlice(mainCluster["processes"])

		for j := 0; j < len(traceResults); j++ {
			if i == j || processed[j] {
				continue
			}

			subCluster := traceResults[j]
			subProcesses := convertToStringSlice(subCluster["processes"])

			if len(subProcesses) < len(mainProcesses) && hasCommonProcess(mainProcesses, subProcesses) {
				// Merge subCluster into mainCluster
				mainCluster["eventlog"] = append(mainCluster["eventlog"].([]Event), subCluster["eventlog"].([]Event)...)
				mainCluster["processes"] = unique(append(mainProcesses, subProcesses...))

				processed[j] = true
			}
		}

		// Only add the mainCluster to mergedClusters if it hasn't been merged into another cluster
		mergedClusters = append(mergedClusters, mainCluster)
		processed[i] = true
	}

	logFinalResult(mergedClusters)
	return mergedClusters
}

// hasCommonProcess checks if there is at least one common process between two slices of processes
func hasCommonProcess(mainProcesses, subProcesses []string) bool {
	processMap := make(map[string]bool)
	for _, process := range mainProcesses {
		processMap[process] = true
	}
	for _, process := range subProcesses {
		if processMap[process] {
			return true
		}
	}
	return false
}

// unique returns a slice with unique elements from the input slice
func unique(elements []string) []string {
	encountered := map[string]bool{}
	result := []string{}

	for _, v := range elements {
		if !encountered[v] {
			encountered[v] = true
			result = append(result, v)
		}
	}
	return result
}

// logFinalResult logs the results of the merged clusters for debugging purposes
func logFinalResult(clusters []map[string]interface{}) {
	for _, cluster := range clusters {
		fmt.Println("Cluster Process Name:", cluster["processName"])
		fmt.Println("Processes:", cluster["processes"])
		for _, event := range cluster["eventlog"].([]Event) {
			fmt.Printf("Event: %+v\n", event)
		}
	}
}

// convertToStringSlice converts an interface{} to a slice of string
func convertToStringSlice(interfaces interface{}) []string {
	switch v := interfaces.(type) {
	case []interface{}:
		strings := make([]string, len(v))
		for i, val := range v {
			strings[i] = val.(string)
		}
		return strings
	case []string:
		return v
	default:
		return []string{}
	}
}
