package database

var addNoteQuery = `INSERT INTO notes (title, content, createddate, updateddate) VALUES (?, ?, ?, ?)`

var getNotesQuery = `SELECT id, title, content, createddate, updateddate FROM notes ORDER BY updateddate DESC`

var getNoteByIdQuery = `SELECT * FROM notes WHERE id = ?`

var getNoteByTitleQuery = `SELECT id, title, content, createddate, updateddate FROM notes WHERE title LIKE ?`

var deleteNoteQuery = `DELETE FROM notes WHERE id = ?`

var updateNoteQuery = `UPDATE notes SET title = ?, content = ?, updateddate = ? WHERE id = ?`
