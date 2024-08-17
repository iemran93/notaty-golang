package main

import (
	"log"
	"net/http"
	"notaty/server/database"
)

func main() {
	fs := http.FileServer(http.Dir("./client"))
	http.Handle("/notes", fs)

	http.Handle("/api/notes", corsMiddleware(http.HandlerFunc(apiHandler)))

	// start db conntection
	err := database.InitDB()
	if err != nil {
		log.Fatal(err)
	}

	// Start the server on port 8000
	http.ListenAndServe(":8000", nil)
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight OPTIONS request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
