package main

import (
	"strings"
	"sync"
)

func Tracer(clusteredData []map[string]interface{}) []map[string]interface{} {
	caseIdMap := make(map[string]string)        // Map to track caseId to the actual merged caseId
	processNameMap := make(map[string]string)   // Map to track caseId to processName
	processClusters := make(map[string][]Event) // Map to store clusters by processName

	var mu sync.Mutex

	var wg sync.WaitGroup

	// initiate concurrent tracing
	for _, cluster := range clusteredData {
		wg.Add(1)
		go func(cluster map[string]interface{}) {
			defer wg.Done()
			processName := cluster["processName"].(string)
			eventlog := cluster["eventlog"].([]Event)
			for _, ev := range eventlog {
				caseId := ev.CaseId
				mu.Lock()
				caseIdMap[caseId] = caseId
				processNameMap[caseId] = processName
				mu.Unlock()
			}
		}(cluster)
	}

	wg.Wait()

	// Merge clusters based on caseReff
	for _, cluster := range clusteredData {
		eventlog := cluster["eventlog"].([]Event)
		for _, ev := range eventlog {
			caseId := ev.CaseId
			if caseReff := ev.CaseReff; caseReff != "" {
				rootCaseId := findRootCaseId(caseIdMap, caseReff)
				caseIdMap[caseId] = rootCaseId
				caseIdMap[caseReff] = rootCaseId
				processNameMap[rootCaseId] = combineProcessNames(processNameMap[rootCaseId], processNameMap[caseId])
			}
		}
	}

	// Rebuild clusters based on merged caseIds and processNames concurrently
	for _, cluster := range clusteredData {
		wg.Add(1)
		go func(cluster map[string]interface{}) {
			defer wg.Done()
			eventlog := cluster["eventlog"].([]Event)
			for _, ev := range eventlog {
				caseId := ev.CaseId
				rootCaseId := findRootCaseId(caseIdMap, caseId)
				ev.CaseId = rootCaseId
				combinedProcessName := processNameMap[rootCaseId]
				mu.Lock()
				processClusters[combinedProcessName] = append(processClusters[combinedProcessName], ev)
				mu.Unlock()
			}
		}(cluster)
	}

	wg.Wait()

	// Convert the map back to the required format
	var result []map[string]interface{}
	for processName, events := range processClusters {
		cluster := map[string]interface{}{
			"processName": processName,
			"eventlog":    events,
			"processes":   getUniqueProcesses(events),
		}
		result = append(result, cluster)
	}

	return result
}

func findRootCaseId(caseIdMap map[string]string, caseId string) string {
	for caseIdMap[caseId] != caseId {
		caseId = caseIdMap[caseId]
	}
	return caseId
}

func combineProcessNames(processName1, processName2 string) string {
	names := strings.Split(processName1, ", ")
	for _, name := range strings.Split(processName2, ", ") {
		if !contains(names, name) {
			names = append(names, name)
		}
	}
	return strings.Join(names, ", ")
}

func contains(slice []string, item string) bool {
	for _, a := range slice {
		if a == item {
			return true
		}
	}
	return false
}

func getUniqueProcesses(events []Event) []string {
	processMap := make(map[string]struct{})
	for _, ev := range events {
		processMap[ev.ProcessName] = struct{}{}
	}

	var processes []string
	for processName := range processMap {
		processes = append(processes, processName)
	}

	return processes
}
