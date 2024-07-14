package main

import (
	"strings"
)

// Preprocessor merges process clusters that contain at least one process in common with the current cluster.
func Preprocessor(traceResults []map[string]interface{}) []map[string]interface{} {
	for i := 0; i < len(traceResults); i++ {
		currentCluster := traceResults[i]
		currentProcesses := convertToStringSlice(currentCluster["processes"])

		for j := 0; j < len(traceResults); j++ {
			if i == j {
				continue
			}

			otherCluster := traceResults[j]
			otherProcesses := convertToStringSlice(otherCluster["processes"])

			if hasCommonProcess(currentProcesses, otherProcesses) {
				// Merge otherCluster into currentCluster
				currentCluster["eventlog"] = append(currentCluster["eventlog"].([]Event), otherCluster["eventlog"].([]Event)...)
				currentCluster["processes"] = unique(append(currentProcesses, otherProcesses...))

				// Merge process names
				currentProcessNames := convertToStringSlice(currentCluster["processName"])
				otherProcessNames := convertToStringSlice(otherCluster["processName"])
				mergedProcessNames := unique(append(currentProcessNames, otherProcessNames...))
				currentCluster["processName"] = strings.Join(mergedProcessNames, ", ")

				// Remove the merged cluster
				traceResults = append(traceResults[:j], traceResults[j+1:]...)
				j-- // Adjust index after removal

				// Update currentProcesses for the next iteration
				currentProcesses = convertToStringSlice(currentCluster["processes"])
			}
		}
	}

	return traceResults
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
