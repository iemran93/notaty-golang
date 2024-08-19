function openModal() {
    var addNoteModal = document.getElementById("addNoteModal")
    var span = document.getElementsByClassName("close")[0];
    addNoteModal.style.display = "block";
    // clear content
    document.getElementById("addTitle").value = ""
    document.getElementById("addContent").value = ""
    span.onclick = function () {
        addNoteModal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == addNoteModal) {
            addNoteModal.style.display = "none";
        }
    }
    document.getElementById("cancelAddNoteBtn").onclick = function () {
        addNoteModal.style.display = "none";
    }
}

function saveNewNote() {
    var title = document.getElementById("addTitle").value
    var content = document.getElementById("addContent").value
    const noteData = { title: title, content: content }
    addNote(noteData).then((res) => {
        if (res.ok) {
            var addNoteModal = document.getElementById("addNoteModal")
            addNoteModal.style.display = "none";
            notify("Note added successfully", "success")
            updateNotes()
        } else {
            res.text().then((err) => { notify(err, "error") })
        }
    }).catch((err) => { notify(err, "error") })
}

function notify(text, icon) {
    if (icon == "error") {
        Swal.fire({
            text: text,
            icon: icon
        });
    } else {
        Swal.fire({
            position: "top-end",
            icon: icon,
            title: text,
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function editNoteModal(noteID) {
    var editNoteModal = document.getElementById("editNoteModal")
    var span = document.getElementsByClassName("close")[1];
    editNoteModal.style.display = "block";
    // get note details
    var noteIdAttribute = document.createAttribute("noteid")
    noteIdAttribute.value = noteID
    editNoteModal.setAttributeNode(noteIdAttribute)
    getNoteById(noteID).then((note) => {
        document.getElementById("editTitle").value = note["title"]
        document.getElementById("editContent").value = note["content"]
    })
    span.onclick = function () {
        editNoteModal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == editNoteModal) {
            editNoteModal.style.display = "none";
        }
    }
    document.getElementById("cancelEditNoteBtn").onclick = function () {
        editNoteModal.style.display = "none";
    }
}

function saveEditNote() {
    var editModal = document.getElementById("editNoteModal")
    var noteID = editModal.getAttribute("noteid")
    noteID = parseInt(noteID)

    var title = document.getElementById("editTitle").value
    var content = document.getElementById("editContent").value

    const note = { id: noteID, title: title, content: content }

    updateNote(note).then((res) => {
        if (res.ok) {
            var editModal = document.getElementById("editNoteModal")
            editModal.style.display = "none";
            notify("Note updated successfully", "success")
            updateNotes()
        } else {
            res.text().then((err) => { notify(err, "error") })
        }
    }).catch((err) => { notify(err, "error") })
}