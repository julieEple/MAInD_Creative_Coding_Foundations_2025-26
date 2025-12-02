const grid = document.getElementById("grid");

const grid_size = 12; //maybe let user choose level which will be defined by gridsize (harder with 40x40 fex)
const cells = []; //2D array of rows with columns
// Access a cell by CELLS[row][col]

let apples = [];
const amountOfApples = 3;

let dir = "up"; //staring direction of the snake will be up 
let paused = false; //ability to pause so that they can choose the character and apple/target
const avatars = document.querySelectorAll(".avatar"); //getting the avatars
let headAvatar = "assets/media/mewtwo.png"; //default avatar/snakehead is a png from assets not the API just for performance reasons
let score = 0; //obvi the starting score is 0 
const scoreDisplay = document.getElementById("score"); //need to dispaly the score through this html element

let speed = 500; // beginning speed
let speedIncrement = 10; // to reduce the interval == make speed up
let minSpeed = 100; //not make it tooooo hard

let snake = [
  //starting snake can´t be empty
  { cc: 5, rc: 5 },
  { cc: 5, rc: 6 },
  { cc: 5, rc: 7 }, // tail
];

let poisonBerries = [];
const amountOfPoison = 2;
let snakeTailColor = "#CBC3E3";

let highscores = JSON.parse(localStorage.getItem("highscores")) || []; //want to save the scores also when window is closed

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



function getRandomPoke() {
  const randomId = Math.floor(Math.random() * 1025); //there are 1025 pokemons (i checked)

  return fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`) //
    .then((response) => response.json())
    .then((data) => {
      const sprite = data.sprites.front_default; // the URL to the image

      return fetch(data.species.url) //new URL to go deeper and get the color of the pokemon
        .then((response) => response.json())
        .then((speciesData) => {
          const color = speciesData.color.name; // color is a string
          return { sprite, color }; //returns both the color-string and the pokemom
        });
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
      return null; // simple fallback
    });
}

function getPokeBall() {
  return fetch("https://pokeapi.co/api/v2/item/poke-ball")
    .then((response) => response.json())
    .then((data) => {
      return data.sprites.default;
    })
    .catch((error) => {
      return null;
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
        makeApple();
        return;
      }
    }
    if (!onSnake) {
      //   const icon = await getRandomBerry();
      let icon = await getPokeBall();
      const newApple = { rc: randR, cc: randC, icon: icon };
      apples.push(newApple);
    }
  }
}

async function makePoisonBerries() {
  //fully the same as make Apple, with some adjustments for the berry
  while (poisonBerries.length < amountOfPoison) {
    const randR = Math.floor(Math.random() * grid_size);
    const randC = Math.floor(Math.random() * grid_size);

    // make sure the poison berry is not placed on the snake
    let onSnake = false;
    for (let part of snake) {
      if (part.rc === randR && part.cc === randC) {
        onSnake = true;
        break;
      }
    }

    if (!onSnake) {
      const icon = await getRandomBerry();
      const newPoison = { rc: randR, cc: randC, icon: icon };
      poisonBerries.push(newPoison);
    }
  }
}

async function makeAvatars() {
  const avatarContainer = document.getElementById("avatars");
  avatarContainer.innerHTML = ""; //empty to begin with

  for (let i = 0; i < 5; i++) {
    //i want 5 random avatars
    const poke = await getRandomPoke(); //using await so that API can load before its being used

    const finalIcon = poke.sprite || "assets/media/mewtwo.png";

    const div = document.createElement("div");
    div.classList.add("ava");
    div.innerHTML = `<img src="${finalIcon}" alt="avatar">`;

    div.dataset.avatar = finalIcon;
    div.dataset.color = poke.color;

    div.addEventListener("click", function () {
      headAvatar = this.dataset.avatar;
      snakeTailColor = this.dataset.color;
    });

    avatarContainer.appendChild(div);
  }
}

function showSnake() {
    for (let r = 0; r < grid_size; r++) { //loop through 2D array of cells 
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
        cells[r][c].innerHTML = `<img src="${headAvatar}" alt="head" />`;
        cells[r][c].style.background = snakeTailColor; // head
      } else {
        cells[r][c].style.background = snakeTailColor; //body
      }
    }
  }
  // Draw the apples using Pokeberries generated in getRandomBerry
  function showApples() {
    //updated so that these are now poison berries
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
  
  function showPoisonBerries() {
    for (let i = 0; i < poisonBerries.length; i++) {
      let berry = poisonBerries[i];
      let r = berry.rc;
      let c = berry.cc;
  
      if (berry.icon) {
        cells[r][c].innerHTML = `<img src="${berry.icon}">`;
      } else {
        cells[r][c].textContent = "💀";
      }
    }
  }
  
  function showHighscores() {
    const list = document.getElementById("highscore-list");
    list.innerHTML = "";
  
    highscores.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `#${index + 1} — <img src="${item.avatar}"> — Score: ${
        item.score
      }`;
      list.appendChild(li);
    });
  }

function move() { //is called on an interval and assigned new head and potentially remove tail
    //condtitions: eat apple, berry or tail 
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
    saveHighscore();
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
  //check if eat berry = game over
  for (let i = 0; i < poisonBerries.length; i++) {
    const poison = poisonBerries[i];
    if (poison.rc === newHead.rc && poison.cc === newHead.cc) {
      saveHighscore();
      startGame(); //Game over baby
      return;
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
    saveHighscore();
    startGame();
  }
  showSnake();
  showApples();
  showPoisonBerries();
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

function saveHighscore() {
  if (!headAvatar) headAvatar = "assets/media/mewtwo.png"; // testing - fallback to ensure a pokemon is being sent
  //now check if the pokemon isalready featured
  const existing = highscores.find((item) => item.avatar === headAvatar);

  if (existing) {
    // Update the score only if the new score is higher
    if (score > existing.score) {
      existing.score = score; //updates score if the new score is better
    }
  } else {
    // Add new entry if the pokemon is not mentioned in the list
    highscores.push({ avatar: headAvatar, score: score });
  }

  // sorting - highest score to lowest score
  highscores.sort((a, b) => b.score - a.score);

  // using slice to only keep the top 10 (should work?)
  highscores = highscores.slice(0, 10);

  localStorage.setItem("highscores", JSON.stringify(highscores));
}

//need to make changes so that game can be restart without .reload()
function resetValues() {
  apples = [];
  poisonBerries = [];
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
  makeAvatars();
  resetValues();
  resetGrid();
  makeGrid();

  makeApple();
  makePoisonBerries();

  showSnake();
  showApples();
  showPoisonBerries();
}

document.addEventListener("DOMContentLoaded", () => {
  makeGrid();
  startGame();
  gameLoop();
});

//navigation between grid-screen and highscore screen
document.getElementById("highscores-btn").addEventListener("click", () => {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("highscore-screen").style.display = "block";
  showHighscores();
});

document.getElementById("back-btn").addEventListener("click", () => {
  document.getElementById("highscore-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
});

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
