// async functions to fetch from the server

const baseURL = "http://localhost:8000/api/notes"

async function getNotes(data, type) {
    let url = baseURL
    switch (type) {
        case "byid":
            url += `?id=${data}`
            break;
        case "bytitle":
            url += `?title=${data}`
            break;
        default:
            break;
    }
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