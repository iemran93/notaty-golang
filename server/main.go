package main

import (
	"log"
	"net/http"
	"notaty/server/database"
)

func main() {
	fs := http.FileServer(http.Dir("./client"))
	http.Handle("/notes", fs)

	http.HandleFunc("/api/notes", apiHandler)

	// start db conntection
	err := database.InitDB()
	if err != nil {
		log.Fatal(err)
	}

	// Start the server on port 8000
	http.ListenAndServe(":8000", nil)
}
