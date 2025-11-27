const grid = document.getElementById("grid");

const grid_size = 12; //maybe let user choose level which will be defined by gridsize (harder with 40x40 fex)
const cells = []; //2D array of rows with columns
// Access a cell by CELLS[row][col]

let apples = [];
const amountOfApples = 3;

let dir = "up";
let paused = false; //ability to pause so that they can choose the character and apple/target
const avatars = document.querySelectorAll(".avatar");
let headAvatar = "🐸";
let score = 0;
const scoreDisplay = document.getElementById("score");

let speed = 500; // beginning speed
let speedIncrement = 10; // to reduce the interval == make speed up
let minSpeed = 100; //not make it tooooo hard

let snake = [
  //starting snake can´t be
  { cc: 5, rc: 5 },
  { cc: 5, rc: 6 },
  { cc: 5, rc: 7 }, // tail
];

let berryList = []; //to be filled by Pokeberries

//creating grid
function makeGrid() {
  for (let r = 0; r < grid_size; r++) {
    //will go through every row and all the columns it contains
    const row = []; //makes new row for every
    for (let c = 0; c < grid_size; c++) {
      const cell = document.createElement("div"); //cell created
      cell.classList.add("cell"); //cell assigned new class cell
      grid.appendChild(cell); //cell added to grid whoch works like a container
      row.push(cell); //column-cell is added to the row-array
    }
    cells.push(row); //row is added to 2D array of rows with column cells
  }
}

function showSnake() {
  for (let r = 0; r < grid_size; r++) {
    for (let c = 0; c < grid_size; c++) {
      cells[r][c].style.background = ""; //empty cell, so that
      cells[r][c].textContent = ""; //empty cell, so that
        cells[r][c].innerHTML = ""; // testing just in case
    }
  }
  for (let i = 0; i < snake.length; i++) {
    //go through every part of the snake (every cell element)
    let snakepart = snake[i];
    let r = snakepart.rc;
    let c = snakepart.cc;

    if (i === 0) {
    cells[r][c].innerHTML = headAvatar; 
      cells[r][c].style.background = "lightyellow"; // head
    } else {
      cells[r][c].style.background = "lightpink"; //body
    }
  }
}
// Draw the apples using Pokeberries generated in getRandomBerry
function showApples() {
  for (let i = 0; i < apples.length; i++) {
    //loop through every apple-elememnt (should be 3)
    let apple = apples[i];
    let r = apple.rc;
    let c = apple.cc;

    if (apple.icon != "🍎") {
      cells[r][c].innerHTML = `<img src="${apple.icon}">`; // using the API-img of the berry inside the cell-element that marks the apple
    } else {
      cells[r][c].textContent = "🍎";
    }
  }
}

function getRandomPoke() {
  const randomId = Math.floor(Math.random() * 1025) + 1; //there are 1025 pokemons (i checked)

  return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`) //
    .then((response) => response.json())
    .then((data) => {
      return data.sprites.front_default; // the URL to the image
    })
    .catch((err) => {
      console.error("Pokemon can not be fetched- error:", err);
      return null;
    });
}

function getRandomBerry() {
  //this is where the berry-magic happens. Made by copying the lecture of weather-API logic as best as I can
  return fetch("https://pokeapi.co/api/v2/berry/") //a list of 20 different berries
    .then((response) => response.json()) //parsing
    .then((data) => {
      const berries = data.results; //results is array of berry elements with name and url
      const randomIndex = Math.floor(Math.random() * berries.length);
      const randomBerry = berries[randomIndex]; //randomberry gets a random berry from the list of berries (results from the API)

      return fetch(randomBerry.url); // Every berry has its own url, so we can go into detail of every berry we want, in this case our chosen random berry
    })

    .then((response) => response.json()) //same procedure now for the specific berry-URL
    .then((berryData) => {
      // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png
      //the imageURL ^ can be found in the item-key with its own url-key/quality
      return fetch(berryData.item.url);
    })
    .then((response) => response.json()) //one more URL to collect to get one step closer to the image URL
    .then((itemData) => {
      // Return the image URL which is found in the sprites under key defauls URL
      return itemData.sprites.default;
    })
    .catch((error) => {
      console.error("Error fetching berry:", error);
      return null; // simple fallback
    });
}

async function makeApple() {
  while (apples.length < amountOfApples) {
    const randR = Math.floor(Math.random() * grid_size);
    const randC = Math.floor(Math.random() * grid_size);

    // make sure the apple is not places on the snake hehe
    let onSnake = false;
    for (let part of snake) {
      if (part.rc === randR && part.cc === randC) {
        onSnake = true;
        break; // breaks if true
      }
    }
    if (!onSnake) {
      const icon = await getRandomBerry();
      const newApple = { rc: randR, cc: randC, icon: icon }; //temporary apple-icon until API is loaded
      apples.push(newApple);
    }
  }
}

async function makeAvatars() { 
    const avatarContainer = document.getElementById("avatars");
    avatarContainer.innerHTML = ""; //empty to begin with
  
    for (let i = 0; i < 5; i++) { //i want 5 random avatars
      const icon = await getRandomPoke();
  
      const finalIcon = icon || "🐸"; //fallback just in case
  
      const div = document.createElement("div");
      div.classList.add("ava");
      div.innerHTML = `<img src="${finalIcon}" alt="avatar">`;
        div.dataset.avatar = finalIcon;
  
      div.addEventListener("click", function () {
        headAvatar = `<img src="${finalIcon}">`;
      });
  
      avatarContainer.appendChild(div);
    }
  }
  

function move() {
  if (paused) return; //wouldnt want to move if we are paused ;)

  let head = snake[0];
  let newHead = { rc: head.rc, cc: head.cc };

  if (dir === "up") newHead.rc--;
  if (dir === "down") newHead.rc++;
  if (dir === "right") newHead.cc++;
  if (dir === "left") newHead.cc--;
  //check if head is moving outside of grid
  if (
    //if the newHead row is bigger than zero aswell as bigger than the grid size (if not it can go out through the top and through the side hehe)
    newHead.rc < 0 ||
    newHead.rc >= grid_size ||
    newHead.cc < 0 ||
    newHead.cc >= grid_size
  ) {
    startGame();
    return;
  }
  snake.unshift(newHead); // new head to animate movement
  // check if snake collides with apple = no tail removed
  let ate = false;
  for (let i = 0; i < apples.length; i++) {
    const apple = apples[i];
    if (apple.rc === newHead.rc && apple.cc === newHead.cc) {
      eatApple(i);
      ate = true;
      break;
    }
  }
  //only remove tail if we don´t eat apple (if we eat apple the snake grows)
  if (!ate) snake.pop();

  //check if head is crashing with body (head cooridnates == any of the other array coordinates)
  let crash = false;
  for (let i = 1; i < snake.length; i++) {
    const part = snake[i];
    if (snake[0].rc === part.rc && snake[0].cc === part.cc) {
      crash = true;
      break;
    }
  }
  if (crash == true) {
    console.log("den krsæjet");
    startGame();
  }
  showSnake();
  showApples();
}

function restartGame() {
  // location.reload();
  startGame();
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function eatApple(apple) {
  apples.splice(apple, 1);
  score++;
  updateScore();
  const eatSound = document.getElementById("eatSound");
  eatSound.currentTime = 0;
  eatSound.play();

  speed = Math.max(minSpeed, speed - speedIncrement);
  makeApple();
  showApples();
}

function gameLoop() {
  if (!paused) move();
  setTimeout(gameLoop, speed);
}

//need to make changes so that game can be restart without .reload()
function resetValues() {
  apples = [];
  snake = [
    { cc: 5, rc: 5 },
    { cc: 5, rc: 6 },
    { cc: 5, rc: 7 },
  ];
  dir = "up";
  paused = false;
  score = 0;
  speed = 500;
  updateScore();
}

function resetGrid() {
  grid.innerHTML = "";
  cells.length = 0;
}

function startGame() {
  resetValues();
  resetGrid();
  makeGrid();
  makeApple();
  showSnake();
}

document.addEventListener("DOMContentLoaded", () => {
  makeGrid();
  makeAvatars();
  startGame();
  gameLoop();
});

//make button panel so I can change directons
document.getElementById("up").addEventListener("click", () => (dir = "up"));
document.getElementById("down").addEventListener("click", () => (dir = "down"));
document.getElementById("left").addEventListener("click", () => (dir = "left"));
document
  .getElementById("right")
  .addEventListener("click", () => (dir = "right"));

// also add keyboard
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") dir = "up";
  if (event.key === "ArrowDown") dir = "down";
  if (event.key === "ArrowLeft") dir = "left";
  if (event.key === "ArrowRight") dir = "right";
});
//eventlistener for space button which pauses game

let pauseButtonText = document.getElementById("pause");

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    paused = !paused; // toggle between true/false aka play/pause
    if (paused) {
      pauseButtonText.textContent = "Resume";
    } else {
      pauseButtonText.textContent = "Pause";
    }
  }
});

pauseButtonText.addEventListener("click", () => {
  paused = !paused;
  if (paused) {
    pauseButtonText.textContent = "Resume";
  } else {
    pauseButtonText.textContent = "Pause";
  }
});
//eventlistener for avatar selection
document.querySelectorAll(".ava").forEach((avatarDiv) => {
  avatarDiv.addEventListener("click", () => {
    headAvatar = avatarDiv.dataset.avatar;
  });
});
