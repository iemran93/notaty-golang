function updateNotes(noteTitle) {
    var accordion = document.getElementById("accordion")
    accordion.innerHTML = ""
    getNotes(noteTitle)
        .then((notes) => {
            notes.forEach(note => {
                let button = document.createElement("button")
                button.classList.add("acc-btn")
                button.innerText = note["title"]
                accordion.appendChild(button)

                let panel = document.createElement("div")
                panel.classList.add("acc-panel")
                accordion.appendChild(panel)

                let panelDate = document.createElement("p")
                panelDate.innerText = `Created: ${note["createdDate"]} - Updated: ${note["updatedDate"]}`
                panelDate.classList.add("acc-date")
                panel.appendChild(panelDate)

                let panelContent = document.createElement("p")
                panelContent.innerText = note["content"]
                panel.appendChild(panelContent)

                // edit link
                let editLink = document.createElement("a")
                editLink.href = "#"
                editLink.onclick = function () {
                    editNoteModal(`${note["id"]}`)
                }
                let editImage = document.createElement("img")
                editImage.src = "static/images/edit.png"
                editImage.style.width = "22px"
                editLink.appendChild(editImage)
                panel.appendChild(editLink)

                // delete link
                let deleteLink = document.createElement("a")
                deleteLink.href = "#"
                deleteLink.onclick = function () {
                    deleteNotify(`${note["id"]}`)
                }
                let deleteImage = document.createElement("img")
                deleteImage.src = "static/images/delete.png"
                deleteImage.style.width = "22px"
                deleteLink.appendChild(deleteImage)
                panel.appendChild(deleteLink)

                button.onclick = function () {
                    //next element sibling is the panel
                    let panel = this.nextElementSibling
                    if (panel.style.display === "block") {
                        panel.style.display = "none";
                    } else {
                        panel.style.display = "block";
                    }
                }
            });
        })
}

function searchNotes() {
    var noteTitle = document.getElementById("searchInput").value
    updateNotes(noteTitle)
}

function deleteNotify(noteID) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteNote(noteID)
                .then(() => {
                    updateNotes()
                })
        }
    });
}

