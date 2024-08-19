// async functions to fetch from the server

const baseURL = "http://localhost:8000/api/notes"

async function getNotes(noteTitle) {
    let url = baseURL
    if (noteTitle) {
        url += `?title=${noteTitle}`
    }
    const response = await fetch(url, {
        method: "GET",
    })
    return response.json()
}

async function getNoteById(noteID) {
    let url = baseURL
    url += `?id=${noteID}`
    const response = await fetch(url, {
        method: "GET",
    })
    return response.json()
}

async function addNote(note) {
    const response = await fetch(baseURL, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(note)
    })

    return response
}

async function updateNote(note) {
    const response = await fetch(baseURL, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(note)
    })

    return response
}

async function deleteNote(noteID) {
    const response = await fetch(`${baseURL}?id=${noteID}`, {
        method: "DELETE",
    })

    return response
}