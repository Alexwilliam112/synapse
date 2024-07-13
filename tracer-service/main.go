package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Event struct {
	ProcessName string `json:"processName"`
	CaseId      string `json:"caseId"`
	EventName   string `json:"eventName"`
	Timestamp   string `json:"timestamp"`
	Department  string `json:"department"`
	User        string `json:"user"`
	CaseReff    string `json:"caseReff"` // New property
}

func handleRPC(w http.ResponseWriter, r *http.Request) {
	var events []Event
	body, err := io.ReadAll(r.Body)
	fmt.Println(body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &events)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Call algorithms from clusterMiner.go and tracer.go
	clusterResults := ClusterMiner(events)
	traceResults := Tracer(events)

	response := map[string]interface{}{
		"clusterResults": clusterResults,
		"traceResults":   traceResults,
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/rpc", handleRPC).Methods("POST")

	fmt.Println("Golang server listening on port 50052")
	log.Fatal(http.ListenAndServe(":50052", r))
}
