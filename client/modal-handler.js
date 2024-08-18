function openModal() {
    var addNoteModal = document.getElementById("addNoteModal")
    var span = document.getElementsByClassName("close")[0];
    addNoteModal.style.display = "block";
    span.onclick = function () {
        addNoteModal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == addNoteModal) {
            addNoteModal.style.display = "none";
        }
    }
}

function saveNewNote() {
    var title = document.getElementById("addTitle").value
    var content = document.getElementById("addContent").value
    const noteData = { title: title, content: content }
    addNote(noteData).then((res) => {
        if (res.ok) {
            var addNoteModal = document.getElementById("addNoteModal")
            // addNoteModal.style.display = "none";
            // notify("Note added successfully", "success")
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