function addNote(){
    const container = document.getElementsByClassName("all-notes")[0]; 

    // adding some tests to undertsand what is happeneing as I build the code 
    if (!container) {
        console.log("test: can´t find all-notes container");
        return;
      }

    const note = document.createElement("li");
    note.classList.add("note-card");

// details of what the note should contain (code copied from index note card body)
    note.innerHTML = `
      <div class="note-card-body"> <!--Body contains buttons and textarea-->
                      <img src="assets/imgs/pngwing.com.png" alt="pin">
                <textarea>  </textarea>
                <div class="note-buttons">
                    <button id="brown" onclick="changeColor(this.id, this.closest('.note-card'))">brown</button>
                    <button id="pink" onclick="changeColor(this.id, this.closest('.note-card'))">pink</button>
                    <button id="green" onclick="changeColor(this.id, this.closest('.note-card'))"> green </button>
                    <button id="yellow" onclick="changeColor(this.id, this.closest('.note-card'))">yellow</button>
                    <button id="delete" onclick="deleteNote(this.closest('.note-card'))"> delete </button>
                    <!-- <button id="save" onclick="saveNote(this.closest('.note-card'))">save</button> -->
                </div>  
            </div>
  `;
    const randomRotation = (Math.random() * 20) - 10; 
    note.style.transform = `rotate(${randomRotation}deg)`;
    const buttonIds = ["green", "brown", "yellow", "pink"];
    const randomId = buttonIds[Math.floor(Math.random() * buttonIds.length)];
    changeColor(randomId, note);
    
    container.appendChild(note);
}

function changeColor(buttonId, note){
    if (!note) return;
    const textarea = note.querySelector("textarea");
    const noterow = note.querySelector(".note-buttons");
    const background = note.querySelector(".note-card-body");


    if (buttonId === "green"){
        note.style.backgroundColor = "#a3b18a";
        background.style.backgroundColor = "#a3b18a";
        textarea.style.backgroundColor = "#a3b18a";
        noterow.style.backgroundColor = "#a3b18a";
    } 
    if (buttonId === "brown") {
        note.style.backgroundColor = "#9c6644";
        background.style.backgroundColor = "#9c6644";
        textarea.style.backgroundColor = "#9c6644";
        noterow.style.backgroundColor = "#9c6644";

    } 
    if (buttonId === "yellow") {
        note.style.backgroundColor = "#f4d58d";
        background.style.backgroundColor = "#f4d58d";
        textarea.style.backgroundColor = "#f4d58d";
        noterow.style.backgroundColor = "#f4d58d";


    }
    if (buttonId === "pink") {
        note.style.backgroundColor = "#f4acb7";
        background.style.backgroundColor = "#f4acb7";
        textarea.style.backgroundColor = "#f4acb7";
        noterow.style.backgroundColor = "#f4acb7";


    }
}

function deleteNote(note){
    // const len = notesList.length;
    // for (let i = 0; i < len; i++) {
    //     console.log(notesList[i])
    //   }
      note.remove();
}

function saveNote(note){ //maybe I´ll finish later if time
    if (!note) return; //shoudl not be possible to save a empty note
    const textarea = note.querySelector("textarea");
    const noteText = textarea.value;
    const noteColor = note.style.backgroundColor;

    const textStorage = { text: noteText, color: noteColor };

}

function shuffleNotes(){
    const container = document.querySelector(".all-notes");
    const notes = Array.from(container.children);

    for (let i = notes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [notes[i], notes[j]] = [notes[j], notes[i]]; // proper random shuffle of the list items
        
    }

    container.innerHTML = "";
    notes.forEach(note => container.appendChild(note));
}



