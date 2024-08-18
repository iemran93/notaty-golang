package main

import (
	"log"
	"net/http"
	"notaty/server/database"
	"path/filepath"
)

func main() {
	// Serve static files from the "client" directory
	fs := http.FileServer(http.Dir("./client"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Serve index.html at the root path
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join("client", "index.html"))
	})

	http.HandleFunc("/api/notes", apiHandler)

	// start db conntection
	err := database.InitDB()
	if err != nil {
		log.Fatal(err)
	}

	// Start the server on port 8000
	http.ListenAndServe(":8000", nil)
}
