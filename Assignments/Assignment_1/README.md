Hello<3 Julie Alme´s first Creative Coding assignment wii! 

## Github repository

### Brief: 
Starting from the concept of a pinboard, implement a web page that:
    - is responsive (properly layout for smartphone, tablet, and desktop) - yep
    - allows the user to add and remove elements - yep
    - allows the user to coustomize elements (i.e. colors, size) - yep
    - allows the switch between two views (at least) - yep
    
    
    
### Screenshots:
### 🗂️ Card-view
![Kortvisning](assets/screenshots/screenshot-cardview.png)

### 📋 List-view
![Listevisning](assets/screenshots/screenshot-listview.png)


   
#### Project description:
My project is a cute notepad consisting of sticky notes in brown, green, yellow and pink. You can write notes and look at notes from card-view, which presents the cards with a small rotation listed next to each other, or list view which is a simple column of list items. Depending on the size of the screen you can see 1-4 cards per row. You can shuffle the notes, change color, delete and and add new notes. 
There is breadtext and title, and a placeholder for empty notes. 


#### Functions:
## addNote() 
creates new note-elements and adds it to the list of notes. Every new note gets a randomized rotation and color. 

## changeColor(randomColor, note) 
takes a color and a note as an argument, and is called when user presses the color-buttons in the note. The function changes the background color of the note. 

## deleteNote(note)
simply removes the note from the list of notes

## shuffleNotes()
makes array from the list to shuffle the order of the note-elements. it uses Random Randit to propertly shuffle every element of the list. Then it readds the array elements to the list


## shiftview()
instead of having two buttons I used one toggle to shift between views. The shifyview checks if the list contains a card-view or list-view class, and changes them when called. If the function is called in card-view the function removes the card-view class and adds a list-view class. I also has functionality to insure that the list-view elements don´t get a rotation, whilst still insuring that the card-view elements get a rotation. 


## last eventlistener 
insures that the textarea of the listview is dynamically updated to fit the text. Basically it makes the textarea grow in real time as more text is added. 
   
