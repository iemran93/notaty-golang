package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"notaty/server/database"
	"strconv"
)

func apiHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		handlePost(w, r)
	case http.MethodGet:
		handleGet(w, r)
	case http.MethodPut:
		handlePut(w, r)
	case http.MethodDelete:
		handleDelete(w, r)
	default:
		JsonResponse(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handlePost(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	var note database.Note
	err := json.Unmarshal(body, &note)
	if err != nil {
		JsonResponse(w, err.Error(), 500)
		return
	}
	// add note to database
	err = database.DBaddNote(note)
	if err != nil {
		JsonResponse(w, err.Error(), 500)
		return
	}
	JsonResponse(w, "", 200)
}

func handleGet(w http.ResponseWriter, r *http.Request) {
	// check if query id is present
	id := r.URL.Query().Get("id")
	if id != "" {
		// get note by ID
		noteID, err := strconv.Atoi(id)
		if err != nil {
			JsonResponse(w, err.Error(), 400)
			return
		}
		if noteID == 0 {
			JsonResponse(w, map[string]string{"error": fmt.Sprintf("Note with ID %d not found", noteID)}, 404)
			return
		}
		note, err := database.DBgetNoteById(noteID)
		if err != nil {
			JsonResponse(w, err.Error(), 500)
			return
		}
		JsonResponse(w, note, 200)
		return
	}

	// check if query title is present
	title := r.URL.Query().Get("title")
	if title != "" {
		// get notes by title
		notes, err := database.DBgetNoteByTitle(title)
		if err != nil {
			JsonResponse(w, err.Error(), 500)
			return
		}
		JsonResponse(w, notes, 200)
		return
	}

	// get all notes
	notes, err := database.DBgetNotes()
	if err != nil {
		JsonResponse(w, err.Error(), 500)
		return
	}
	JsonResponse(w, notes, 200)
}

func handlePut(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	var note database.Note
	err := json.Unmarshal(body, &note)
	if err != nil {
		JsonResponse(w, err.Error(), 400)
		return
	}

	err = database.DBupdateNoteById(note)
	if err != nil {
		JsonResponse(w, err.Error(), 500)
		return
	}

	JsonResponse(w, "", 200)
}

func handleDelete(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	noteID, err := strconv.Atoi(id)
	if err != nil {
		JsonResponse(w, err.Error(), 400)
		return
	}

	err = database.DBdeleteNoteById(noteID)
	if err != nil {
		JsonResponse(w, err.Error(), 500)
		return
	}

	JsonResponse(w, "", 200)
}

func JsonResponse(w http.ResponseWriter, data interface{}, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
