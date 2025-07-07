const form = document.getElementById('noteForm');
const noteDate = document.getElementById('noteDate');
const noteText = document.getElementById('noteText');
const notesList = document.getElementById('notesList');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Render existing notes
notes.forEach(displayNote);
updateNoteCount();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const date = noteDate.value;
  const text = noteText.value;

  if (!date || !text) return;

  const noteObj = {
    id: Date.now(),
    date,
    text,
  };

  notes.unshift(noteObj);
  localStorage.setItem('notes', JSON.stringify(notes));

  displayNote(noteObj);
  updateNoteCount();

  noteDate.value = '';
  noteText.value = '';
});

function displayNote(noteObj) {
  const note = document.createElement('div');
  note.classList.add('note');
  note.setAttribute('data-id', noteObj.id);

  const dateHeading = document.createElement('h3');
  dateHeading.innerText = `📅 ${new Date(noteObj.date).toDateString()}`;

  const noteContent = document.createElement('p');
  noteContent.innerText = noteObj.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = '🗑️ Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => deleteNote(noteObj.id);

  note.appendChild(dateHeading);
  note.appendChild(noteContent);
  note.appendChild(deleteBtn);

  notesList.prepend(note);
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  localStorage.setItem('notes', JSON.stringify(notes));

  document.querySelector(`[data-id="${id}"]`).remove();
  updateNoteCount();
}

function updateNoteCount() {
  let counter = document.getElementById('noteCounter');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'noteCounter';
    counter.style = 'text-align:center;margin-top:10px;color:#333;font-weight:bold;';
    document.querySelector('.glass-container').appendChild(counter);
  }
  counter.innerText = `🗒️ Total Notes: ${notes.length}`;
}
