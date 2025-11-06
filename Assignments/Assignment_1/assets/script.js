function addNote(){
    const container = document.getElementById("all-notes"); 

    // adding some tests to undertsand what is happeneing as I build the code 
    if (!container) {
        console.log("test: can´t find all-notes container");
        return;
      }
    const note = document.createElement("li");
    note.classList.add("note-card");

    const randomRotation = (Math.random() * 20) - 10; 
        
    const buttonIds = ["green", "brown", "yellow", "pink"];
    const randomColor = buttonIds[Math.floor(Math.random() * buttonIds.length)];

    note.dataset.rotation = randomRotation;
    note.dataset.color = randomColor;

// details of what the note should contain (code copied from index note card body)
    note.innerHTML = ` <div class="note-card-body"> <!--Body contains buttons and textarea-->
                    <img src="assets/imgs/pngwing.com.png" alt="pin">
                     <textarea class="title" placeholder="Title"></textarea>
                    <textarea class="breadtext" placeholder="...Whatever is on your mind"></textarea>
                    <div class="note-buttons">
                        <button id="brown" onclick="changeColor(this.id, this.closest('.note-card'))">brown</button>
                        <button id="pink" onclick="changeColor(this.id, this.closest('.note-card'))">pink</button>
                        <button id="green" onclick="changeColor(this.id, this.closest('.note-card'))"> green </button>
                        <button id="yellow" onclick="changeColor(this.id, this.closest('.note-card'))">yellow</button>
                        <button id="delete" onclick="deleteNote(this.closest('.note-card'))"> delete </button>
                        <!-- <button id="save" onclick="saveNote(this.closest('.note-card'))">save</button> -->
                    </div>  
                </div>
        </li> 
  `;

  changeColor(randomColor, note);

  if (container.classList.contains("card-view")) {
    note.style.transform = `rotate(${randomRotation}deg)`;
  }

  container.appendChild(note);
}


function changeColor(buttonId, note){
    if (!note) return;

    const background = note.querySelector(".note-card-body");

    if (buttonId === "green"){
        note.style.backgroundColor = "#a3b18a";
        background.style.backgroundColor = "#a3b18a";
    } 
    if (buttonId === "brown") {
        note.style.backgroundColor = "#9c6644";
        background.style.backgroundColor = "#9c6644";
    } 
    if (buttonId === "yellow") {
        note.style.backgroundColor = "#f4d58d";
        background.style.backgroundColor = "#f4d58d";

    }
    if (buttonId === "pink") {
        note.style.backgroundColor = "#f4acb7";
        background.style.backgroundColor = "#f4acb7";
    }
}

function deleteNote(note){
      note.remove();
    
}


function shuffleNotes(){
    const container = document.getElementById("all-notes"); 
    const notes = Array.from(container.children);

    for (let i = notes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [notes[i], notes[j]] = [notes[j], notes[i]]; // proper random shuffle of the list items
    }
    container.innerHTML = "";
    notes.forEach(note => container.appendChild(note));
}


function shiftview() {
    const container = document.getElementById("all-notes");
  
    if (container.classList.contains("card-view")) {
      // change to list-view
      container.classList.remove("card-view");
      container.classList.add("list-view");
  
      // remove rotation
      const notes = container.getElementsByClassName('note-card');
      for (const note of notes) {
        note.style.transform = "none";
        note.style.backgroundColor = "none";
      }
    } else {
      // change to card-view
      container.classList.remove("list-view");
      container.classList.add("card-view");
  
      // add rotation
      const notes = container.getElementsByClassName('note-card');
      for (const note of notes) {
        const rotation = note.dataset.rotation;
        note.style.transform = `rotate(${rotation}deg)`;
      }
    }
  }



//eventlistener for dynamic sizing of textarea breadtext
document.addEventListener("input", function (event) {
  if (event.target.matches(".breadtext")) {
    const textarea = event.target;
    textarea.style.height = "auto"; // nullstill høyde
    textarea.style.height = textarea.scrollHeight + "px"; // sett ny høyde
  }
});
 
    