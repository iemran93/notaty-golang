// async functions to fetch from the server

const baseURL = "http://localhost:8000/api/notes"

async function getdata() {
    const response = await fetch(baseURL, {
        method: "POST",
    })
    return response
}