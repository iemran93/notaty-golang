package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func connect() error {
	db, err := sql.Open("sqlite3", "server/database/noteDB.db")
	if err != nil {
		return err
	}
	DB = db
	return nil
}

func InitDB() error {
	// connect
	err := connect()
	if err != nil {
		return err
	}

	// Read the SQL file
	sqlBytes, err := os.ReadFile("server/database/database.sql")
	if err != nil {
		return err
	}

	// Execute the SQL statements
	_, err = DB.Exec(string(sqlBytes))
	if err != nil {
		return err
	}

	log.Println("Database initialized successfully")
	return nil
}

func DBaddNote(note Note) error {
	note.CreatedDate = time.Now().Format("2006-01-02 15:04:05")
	note.UpdatedDate = time.Now().Format("2006-01-02 15:04:05")
	noteTitle, noteContent := strings.TrimSpace(note.Title), strings.TrimSpace(note.Content)
	if noteTitle == "" || noteContent == "" {
		return fmt.Errorf("title and content cant be empty")
	}
	// add note to database
	_, err := DB.Exec(addNoteQuery, note.Title, note.Content, note.CreatedDate, note.UpdatedDate)
	if err != nil {
		return err
	}
	return nil
}

func DBgetNotes() ([]Note, error) {
	rows, err := DB.Query(getNotesQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var notes []Note
	for rows.Next() {
		var note Note
		err := rows.Scan(&note.Id, &note.Title, &note.Content, &note.CreatedDate, &note.UpdatedDate)
		if err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}
	return notes, nil
}

func DBgetNoteById(id int) (Note, error) {
	var note Note
	err := DB.QueryRow(getNoteByIdQuery, id).Scan(&note.Id, &note.Title, &note.Content, &note.CreatedDate, &note.UpdatedDate)
	if err != nil {
		return Note{}, err
	}
	return note, nil
}

func DBgetNoteByTitle(title string) ([]Note, error) {
	var notes []Note
	pattern := fmt.Sprintf("%%%s%%", title) // Matching the title with wildcards

	rows, err := DB.Query(getNoteByTitleQuery, pattern)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var note Note
		if err := rows.Scan(&note.Id, &note.Title, &note.Content, &note.CreatedDate, &note.UpdatedDate); err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return notes, nil
}

func DBdeleteNoteById(id int) error {
	_, err := DB.Exec(deleteNoteQuery, id)
	if err != nil {
		return err
	}
	return nil
}

func DBupdateNoteById(note Note) error {
	note.UpdatedDate = time.Now().Format("2006-01-02 15:04:05")
	_, err := DB.Exec(updateNoteQuery, note.Title, note.Content, note.UpdatedDate, note.Id)
	if err != nil {
		return err
	}
	return nil
}
