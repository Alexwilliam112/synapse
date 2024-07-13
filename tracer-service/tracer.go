package main

import (
	"strings"
)

func Tracer(clusteredData []map[string]interface{}) []map[string]interface{} {
	caseIdMap := make(map[string]string)      // Map to track caseId to the actual merged caseId
	processNameMap := make(map[string]string) // Map to track caseId to processName
	clusterMap := make(map[string][]Event)    // Map to track the merged clusters

	// Initialize caseIdMap and processNameMap
	for _, cluster := range clusteredData {
		processName := cluster["processName"].(string)
		eventlog := cluster["eventlog"].([]Event)
		for _, ev := range eventlog {
			caseId := ev.CaseId
			caseIdMap[caseId] = caseId
			processNameMap[caseId] = processName
		}
	}

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

	// Rebuild clusters based on merged caseIds
	for _, cluster := range clusteredData {
		eventlog := cluster["eventlog"].([]Event)
		for _, ev := range eventlog {
			caseId := ev.CaseId
			rootCaseId := findRootCaseId(caseIdMap, caseId)
			ev.CaseId = rootCaseId
			clusterMap[rootCaseId] = append(clusterMap[rootCaseId], ev)
		}
	}

	// Convert the map back to the required format
	var result []map[string]interface{}
	for rootCaseId, events := range clusterMap {
		cluster := map[string]interface{}{
			"processName": processNameMap[rootCaseId],
			"eventlog":    events,
		}
		result = append(result, cluster)
	}

	// Log the merged clusters
	logClusterResults(result)

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
