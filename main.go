package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type requestType string

const (
	login requestType = "login"
)

type response struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Prompt  string `json:"prompt"`
}

func main() {

	http.HandleFunc("/api/request", request)
	http.Handle("/", http.FileServer(http.Dir("static")))

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}

}

func request(w http.ResponseWriter, r *http.Request) {
	request := r.URL.Query().Get("request")
	switch request {
	case string(login):
		loginResponse(w, r)
	default:
		unknownRequest(w, r)
	}
}

func loginResponse(w http.ResponseWriter, r *http.Request) {
	resp := response{
		Success: true,
		Message: "Login successful",
		Prompt:  "tom@knight-net:$  ",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func unknownRequest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Unknown request"))
}
