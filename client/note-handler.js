function updateNotes() {
    var accordion = document.getElementById("accordion")
    getNotes("", "")
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
                let editImage = document.createElement("img")
                editImage.src = "./images/edit.png"
                editImage.style.width = "22px"
                editLink.appendChild(editImage)
                panel.appendChild(editLink)

                // delete link
                let deleteLink = document.createElement("a")
                deleteLink.href = "#"
                let deleteImage = document.createElement("img")
                deleteImage.src = "./images/delete.png"
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