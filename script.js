function saveNote() {
  const date = document.getElementById("date").value;
  const note = document.getElementById("note").value.trim();

  if (!date || !note) {
    alert("Please select a date and enter a note.");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("calendarNotes") || "{}");

  if (!notes[date]) {
    notes[date] = [];
  }

  notes[date].push(note);
  localStorage.setItem("calendarNotes", JSON.stringify(notes));

  document.getElementById("note").value = "";
  loadNotes();
}

function loadNotes() {
  const date = document.getElementById("date").value;
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  if (!date) return;

  const notes = JSON.parse(localStorage.getItem("calendarNotes") || "{}");
  const dateNotes = notes[date] || [];

  dateNotes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}

document.getElementById("date").addEventListener("change", loadNotes);
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
