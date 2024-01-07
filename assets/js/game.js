console.log("game.js loaded")

// global variables
let tile = []
let stateHistory = []
let cellSize
let tileSize
const tileBlack = "&#9899;" 
const tileWhite = "&#9898;" 
let blackCount = 0
let whiteCount = 0
let playerTurn = -1

// initial load
initTiles()
resizeCanvas()  //which includes initGameBoard
NewGame()

// resize canvas
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
function resizeCanvas() {
  console.log("resizing")
  cellSize = Math.min(window.innerWidth, window.innerHeight*.8) / 9
  tileSize = cellSize * .92
  initGameBoard()

}

// initialize the board array
function initTiles () {
  tile=[]
  for (col = 0; col < 8; col++){       //x
    tile.push([])
    for (row = 0; row < 8; row++){     //y
    tile[col].push(0)
    }
  }

  // create initial four
  tile[3][3] = 1       //tile[col=x][row=y]
  tile[4][3] = -1
  tile[3][4] = -1
  tile[4][4] = 1
}

// initialize gameBoard table
function initGameBoard () {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = ""
  for (y = 0; y < 8; y++) {
    let row = document.createElement("div")
    for (x = 0; x < 8; x++) {
      let cell = document.createElement("div")
      cell.classList.add("cell")
      cell.id = `${x}${y}`
      cell.style.width = `${cellSize}px`
      cell.style.height = `${cellSize}px`
      cell.style.fontSize = `${tileSize}px`
      row.appendChild(cell)
    }
    gameBoard.appendChild(row)
  }
  drawBoard()
}

// initialize new game
function NewGame() {
  playerTurn = -1
  initTiles() // clear tile array
  initGameBoard() // create and redraw game board 

  // create initial stateHistory
  stateHistory = [JSON.parse(JSON.stringify(tile))]
  stateHistory[0].push(playerTurn)  //turn

  // trigger robots
  if (WhiteRobotOn && BlackRobotOn) {
    GoRobot()
  }
}

function update_counts() {
  blackCount = 0
  whiteCount = 0
  for (col = 0; col < 8; col++){
    for (row = 0; row < 8; row++){
      if (tile[col][row] == -1) {
        blackCount++
      }
      else if (tile[col][row] == 1) {
        whiteCount++
      }
    }
  }
}

function updateInfoBar () {
  update_counts()
  document.getElementById("BlackCount").innerHTML = blackCount
  document.getElementById("WhiteCount").innerHTML = whiteCount
  if (playerTurn == -1) {  
    document.getElementById("black_info").style.border = "3px dashed #777"
    document.getElementById("white_info").style.border = "none"
  }
  else {
    document.getElementById("black_info").style.border = "none"
    document.getElementById("white_info").style.border = "3px dashed #777"
  }
}

function drawBoard() {
  updateInfoBar()

  for (col = 0; col < 8; col++){
    for (row = 0; row < 8; row++){
      document.getElementById(`${col}${row}`).classList.remove("lastMove")
      if (tile[col][row] == -1) {
        document.getElementById(`${col}${row}`).innerHTML = tileBlack
      }
      else if (tile[col][row] == 1) {
        document.getElementById(`${col}${row}`).innerHTML = tileWhite
      }
      else {
        document.getElementById(`${col}${row}`).innerHTML = ""
      }
    }
  }

  //last move marker
  if (blackCount + whiteCount > 4) {
    let last_col = stateHistory[stateHistory.length-1][9]
    let last_row = stateHistory[stateHistory.length-1][10]
    document.getElementById(`${last_col}${last_row}`).classList.add("lastMove")
  }
}

//Detect Mouse Moves
const gameBoard = document.getElementById('gameBoard')
gameBoard.addEventListener("click", (event) => {
  //console.log(event.target.id)
  let move = event.target.id
  col = move[0]
  row = move[1]
  Check_Move(parseInt(col), parseInt(row), "flip")
})

// var canvasElem = document.getElementById('gameBoard')
// canvasElem.addEventListener("mouseup", function(e){
//   let rect = canvas.getBoundingClientRect();
//   let mouse_x = e.clientX - rect.left;
//   let mouse_y = e.clientY - rect.top;
//   Locate_Move(mouse_x, mouse_y)
//   e.preventDefault()
// }, false)
// canvasElem.addEventListener("touchend", function(e){
//   let touchobj = e.changedTouches[0]
//   let rect = canvas.getBoundingClientRect();
//   mouse_x = touchobj.clientX - rect.left;
//   mouse_y = touchobj.clientY - rect.top;
//   Locate_Move(mouse_x, mouse_y)
//   e.preventDefault()
// }, false)

//manually de-hover to accommodate stupid mobile non-hover capability
var buttons = document.querySelectorAll('header input');
buttons.forEach(button => {  
  // button.addEventListener("mouseover", (e) => {
  //   button.className = "input_hover";
  // });
  // button.addEventListener("mouseout", function(e){
  //   button.className = "input_dehover"
  // })
  button.addEventListener("touchstart", function(e){
    button.className = "input_hover";
    //e.preventDefault()
  });
  button.addEventListener("touchend", function(e){
    button.className = "input_dehover";
    //e.preventDefault()
  });
  button.addEventListener("touchcancel", function(e){
    button.className = "input_dehover";
    //e.preventDefault()
  });
});

//Handle Moves
function Locate_Move(located_row, located_col) {
  located_row = 99
  located_col = 99
  for (var col = 0; col < 8; col++){
    for (var row = 0; row < 8; row++){
      if (mouse_x > (tile_size*col)) {
        if (mouse_x < (tile_size*col) + tile_size) {
          located_col = col
        }
      }
      if (mouse_y > tile_size*row) {
        if (mouse_y < tile_size*row + tile_size) {
          located_row = row
        }
      }
    }
  }
  if ((located_col != 99) && (located_row != 99)) {   //off board
    if (tile[located_col][located_row] == 0) {        //not occupied
      //console.log(located_col, located_row, tile[located_col][located_row])
      Check_Move(located_col, located_row, "flip")
    }
  }
}

function Check_Move(located_col, located_row, command) {        //check moves; and implement flips unless command = ""
  //console.log("checking move: ", located_row, located_col)

  Valid_Move = false
  if (located_col+2 < 8) {
    if (tile[located_col+1][located_row] == playerTurn*-1) {    //right
      for (i = 2; i < 8; i++) {
        if (located_col+i < 8) {
          if (tile[located_col+i][located_row] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "right", command)
            break
          }
          else if (tile[located_col+i][located_row] == 0) {
            break
          }
        }
      }
    }
  }

  if ((located_col+2 < 8) && (located_row+2 < 8)) {
    if (tile[located_col+1][located_row+1] == playerTurn*-1) {  //right-down
      for (i = 2; i < 8; i++) {
        if ((located_col+i < 8) && (located_row+i < 8)) {
          if (tile[located_col+i][located_row+i] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "right-down", command)
            break
          }
          else if (tile[located_col+i][located_row+i] == 0) {
            break
          }
        }
      }
    }
  }
  if (located_row+2 < 8) {
    if (tile[located_col][located_row+1] == playerTurn*-1) {  //down
      for (i = 2; i < 8; i++) {
        if (located_row+i < 8) {
          if (tile[located_col][located_row+i] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "down", command)
            break
          }
          else if (tile[located_col][located_row+i] == 0) {
            break
          }
        }
      }
    }
  }
  if ((located_col-2 >= 0) && (located_row+2 < 8)) {
    if (tile[located_col-1][located_row+1] == playerTurn*-1) {  //down-left
      for (i = 2; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row+i < 8)) {
          if (tile[located_col-i][located_row+i] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "down-left", command)
            break
          }
          else if (tile[located_col-i][located_row+i] == 0) {
            break
          }
        }
      }
    }
  }
  if (located_col-2 >= 0) {
    if (tile[located_col-1][located_row] == playerTurn*-1) {  //left
      for (i = 2; i < 8; i++) {
        if (located_col-i >= 0) {
          if (tile[located_col-i][located_row] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "left", command)
            break
          }
          else if (tile[located_col-i][located_row] == 0) {
            break
          }
        }
      }
    }
  }
  if ((located_col-2 >= 0) && (located_row-2 >= 0)) {
    if (tile[located_col-1][located_row-1] == playerTurn*-1) {  //left-up
      for (i = 2; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row-i >= 0)) {
          if (tile[located_col-i][located_row-i] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "left-up", command)
            break
          }
          else if (tile[located_col-i][located_row-i] == 0) {
            break
          }
        }
      }
    }
  }
  if (located_row-2 >= 0) {
    if (tile[located_col][located_row-1] == playerTurn*-1) {  //up
      for (i = 2; i < 8; i++) {
        if (located_row-i >= 0) {
          if (tile[located_col][located_row-i] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "up", command)
            break
          }
          else if (tile[located_col][located_row-i] == 0) {
            break
          }
        }
      }
    }
  }
  if ((located_col+2 < 8) && (located_row-2 >= 0)) {
    if (tile[located_col+1][located_row-1] == playerTurn*-1) {  //up-right
      for (i = 2; i < 8; i++) {
        if ((located_col+i < 8) && (located_row-i >= 0)) {
          if (tile[located_col+i][located_row-i] == playerTurn) {
            Valid_Move = true
            Flip(located_col, located_row, "up-right", command)
            break
          }
          else if (tile[located_col+i][located_row-i] == 0) {
            break
          }
        }
      }
    }
  }

  if ((Valid_Move == true) && (command != "just_check")) {
    //console.log("Valid_Move: ", Valid_Move)
    tile[located_col][located_row] = playerTurn // place piece
    Next_Move(located_col, located_row)
  }
  return Valid_Move
}

// TODO: implement
function flipAnimation (col, row, color) {
 
  const element = document.getElementById('character');
  element.classList.add('fade-out');
  setTimeout(() => {
    // Change the character
    element.textContent = 'B';

    // Start fade in
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
  }, 1000); // The timeout should match the duration of the fade-out animation

  // CSS:
  // @keyframes fadeOut {
  //   from { opacity: 1; }
  //   to { opacity: 0; }
  // }
  // @keyframes fadeIn {
  //   from { opacity: 0; }
  //   to { opacity: 1; }
  // }
  // .fade-out {
  //   animation: fadeOut 1s forwards;
  // }
  // .fade-in {
  //   animation: fadeIn 1s forwards;
  // }
  }

function Flip(located_col, located_row, direction, command) {
  if (command != "just_check") {
    //console.log("Flipping: ", located_col, located_row, direction, command)

    if (direction == "right") {
      for (i = 1; i < 8; i++) {
        if ((located_col+i < 8) && (tile[located_col+i][located_row] == playerTurn * -1)) {
          tile[located_col+i][located_row] = playerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "right-down") {
      for (i = 1; i < 8; i++) {
        if ((located_col+i < 8) && (located_row+i < 8) && (tile[located_col+i][located_row+i] == playerTurn * -1)) {
          tile[located_col+i][located_row+i] = playerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "down") {
      for (i = 1; i < 8; i++) {
        if ((located_row+i < 8) && (tile[located_col][located_row+i] == playerTurn * -1)) {
          tile[located_col][located_row+i] = playerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "down-left") {
      for (i = 1; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row+i < 8) && (tile[located_col-i][located_row+i] == playerTurn * -1)) {
          tile[located_col-i][located_row+i] = playerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "left") {
      for (i = 1; i < 8; i++) {
        if ((located_col-i >= 0) && (tile[located_col-i][located_row] == playerTurn * -1)) {
          tile[located_col-i][located_row] = playerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "left-up") {
      for (i = 1; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row-i >= 0) && (tile[located_col-i][located_row-i] == playerTurn * -1)) {
          tile[located_col-i][located_row-i] = playerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "up") {
      for (i = 1; i < 8; i++) {
        if ((located_row-i >= 0) && (tile[located_col][located_row-i] == playerTurn * -1)) {
          tile[located_col][located_row-i] = playerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "up-right") {
      for (i = 1; i < 8; i++) {
        if ((located_col+i < 8) && (located_row-i >= 0) && (tile[located_col+i][located_row-i] == playerTurn * -1)) {
          tile[located_col+i][located_row-i] = playerTurn
        }
        else {
          break
        }
      }
    }
  }
}

function CheckForPass() {
  NoMoves = true
  for (col = 0; col < 8; col++){
    for (row = 0; row < 8; row++){
      if (tile[col][row] == 0) {
        if (Check_Move(col, row, "just_check") == true) {
          NoMoves = false
          //console.log("found move: ", col, row)
        }
      }
    }
  }
  return NoMoves
}

//was just able to locate a valid move and placed tile; now implementing next turn logic
function Next_Move(located_col, located_row) {  
  playerTurn = playerTurn * -1;
  saveState(located_col, located_row); 
  drawBoard()

  if (CheckForPass()) {
    //console.log("pass", playerTurn)
    playerTurn = playerTurn * -1; // change turns again
    
    //changing history so that robots can handle passing
    stateHistory[stateHistory.length-1][8] = stateHistory[stateHistory.length-1][8] * -1

    if (CheckForPass()) {
      //console.log("double pass", playerTurn)
      //console.log("game over");

      // stop robots
      playerTurn = 0

      // display credits
      if (blackCount > whiteCount) {  //todo: improve game over message
        document.getElementById("black_info").style.border = "3px dashed #777"
        document.getElementById("white_info").style.border = "none"
      } else if (blackCount < whiteCount) {
        document.getElementById("black_info").style.border = "none"
        document.getElementById("white_info").style.border = "3px dashed #777"
      } else if (blackCount == whiteCount) {
        document.getElementById("black_info").style.border = "3px dashed #777"
        document.getElementById("white_info").style.border = "3px dashed #777"
      }
    } else {
      if (playerTurn == -1 && BlackRobotOn) {
        GoRobot();
      } else if (playerTurn == 1 && WhiteRobotOn) {
        GoRobot();
      }
    }
  } else {
    if (playerTurn == -1 && BlackRobotOn) {
      GoRobot();
    } else if (playerTurn == 1 && WhiteRobotOn) {
      GoRobot();
    }
  }
}

//Save State & Back Button
var moves_history = []
function saveState(located_col, located_row) {       //BUG: not saving state correctly on passes
  //console.log("saving state: ", playerTurn, located_col, located_row)

  tilec = JSON.parse(JSON.stringify(tile))
  stateHistory.push([])
  for (col = 0; col < 8; col++){          //record state (for back button)
    stateHistory[stateHistory.length-1].push([])
    for (row = 0; row < 8; row++){
      stateHistory[stateHistory.length-1][col].push(tilec[col][row])
    }
  }
  stateHistory[stateHistory.length-1].push(playerTurn)
  stateHistory[stateHistory.length-1].push(located_col)
  stateHistory[stateHistory.length-1].push(located_row)

  //current_move = (located_col) + (located_row)*8      //0...63
  //moves_history.push(current_move)
}

function BackBtn() {
  stateHistory.pop()   //remove last move from moves_history
  state_historyc = JSON.parse(JSON.stringify(stateHistory))

  initTiles() //clear tiles

  if (state_historyc.length > 0) {
    for (col = 0; col < 8; col++){
      for (row = 0; row < 8; row++){
        tile[col][row] = state_historyc[state_historyc.length-1][col][row]
      }
    }
    playerTurn = state_historyc[state_historyc.length-1][8]
    drawBoard()
  }
  else {
    NewGame ()
  }
}

//Robot Buttons
var BlackRobotOn = false
function BlackRobotBtn() {

  //change status and trigger play if it is the robot's turn
  if (BlackRobotOn == true) {
    BlackRobotOn = false
    document.getElementById("black_robot_button").style.backgroundColor = '';
    document.getElementById("blackrobotToggleLabel").textContent = "Human"
    //document.getElementById("blackrobotToggleLabel").style.float = "left"
  }
  else {
    BlackRobotOn = true
    document.getElementById("black_robot_button").style.backgroundColor = '#C8C8C8'
    document.getElementById("blackrobotToggleLabel").textContent = "Robot"
    //document.getElementById("blackrobotToggleLabel").style.float = "right"
    if (playerTurn == -1) {
      GoRobot()
    }
  }
}
var WhiteRobotOn = false
function WhiteRobotBtn() {
  if (WhiteRobotOn == true) {
    WhiteRobotOn = false
    document.getElementById("white_robot_button").style.backgroundColor = ''
    document.getElementById("whiterobotToggleLabel").textContent = "Human"
    
  }
  else {
    WhiteRobotOn = true
    document.getElementById("white_robot_button").style.backgroundColor = '#C8C8C8'
    document.getElementById("whiterobotToggleLabel").textContent = "Robot"
    if (playerTurn == 1) {
      GoRobot()
    }
  }
}