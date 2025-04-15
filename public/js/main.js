//fetch and display note on page load
window.onload = async () => {
    try {
        const response = await fetch('/notes');
        const notes = await response.json()
        notes.forEach(addNoteToList);
    } catch (err) {
        console.log("error in fetching notes : ", err)
    }
};

document.getElementById("noteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        const response = await fetch("/notes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        const data = await response.json();
        if (response.status === 201) {
            addNoteToList(data);
        } else {
            console.log("error adding note : ", data.message)
        }
    } catch (err) {
        console.log('Error', err)
    }

    //after adding the note clear the input field
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});

function showNotemodal(title, content) {
    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.innerHTML = `<div class = "modal-content">
            <button class = "modal-close">&times;</button>
            <h2>${title}</h2>
            <p>${content}</p>
        </div>`;
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function addNoteToList(note) {
    const li = document.createElement('li')
    const noteContent = document.createElement('div');
    noteContent.className = 'note-content';
    noteContent.textContent = `${note.title} : ${note.content}`;
    noteContent.onclick = () => showNotemodal(note.title, note.content);
    li.appendChild(noteContent);

    // edit button  
    const editBtn = document.createElement('button')  // Changed variable name
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-button'
    editBtn.onclick = () => editNote(note._id)  // Fixed function reference
    li.appendChild(editBtn)

    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteNote(note._id);
    li.appendChild(deleteButton);

    document.getElementById('notesList').appendChild(li)
}

async function editNote(noteId) {
    const newTitle = prompt('Enter new Title ')
    const newContent = prompt('Enter new Content ')
    if (!newTitle || !newContent) return;  // Added validation
    
    try {
        const response = await fetch(`/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle, content: newContent })
        })
        if (response.status !== 200) {
            const data = await response.json();
            console.error('Error in updating note : ', data.message)  // Fixed typo
        } else {
            location.reload();
        }
    } catch (err) {
        console.log('Error : ', err);
    }
}

async function deleteNote(noteId) {
    try {
        const response = await fetch(`/notes/${noteId}`, {
            method: 'DELETE'
        })
        if (response.status !== 200) {
            const data = await response.json()
            console.log('Error in deleting note : ', data.message)
        } else {
            location.reload();
        }
    } catch (err) {
        console.log('Error : ', err)
    }
}
