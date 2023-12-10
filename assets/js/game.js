console.log("game.js loaded")

//initialize canvas
var canvas = document.getElementById("main_canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d");

//global variables
var tile = []
var state_history = []
var Rows = 8
var Cols = 8
var tile_size = 20
var tile_size_for_drawing = tile_size * .9
var bottomspace = 200
var Black_Count = 0
var White_Count = 0
var PlayerTurn = -1

Init_Board()
resizeCanvas()

//resize canvas
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth, window.innerHeight - bottomspace);
  canvas.height = canvas.width;

  tile_size = Math.ceil(canvas.width / Rows) - 2;
  tile_size_for_drawing = tile_size * 0.9;

  RefreshBoard();
}

//initialize new game
function NewGame () {
  Init_Board()
  RefreshBoard()

  if (WhiteRobotOn && BlackRobotOn) {
    GoRobot()
  }
}
function RefreshBoard () {
  Draw_Board()
  Draw_Tiles()
  Draw_InfoBar()
}

function Init_Board () {
  PlayerTurn = -1

  //create board array
  tile=[]
  for (col = 0; col < Cols; col++){       //x
    tile.push([])
    for (row = 0; row < Rows; row++){     //y
    tile[col].push(0)
    }
  }

  //create initial four
  tile[3][3] = 1       //tile[col=x][row=y]
  tile[4][3] = -1
  tile[3][4] = -1
  tile[4][4] = 1

  //create initial state_history
  state_history = [JSON.parse(JSON.stringify(tile))]
  state_history[0].push(PlayerTurn)  //turn
}

function clear_board (){
  //create board array
  tile=[]
  for (col = 0; col < Cols; col++){       //x
    tile.push([])
    for (row = 0; row < Rows; row++){     //y
    tile[col].push(0)
    }
  }
  //create initial four
  tile[3][3] = 1       //tile[col=x][row=y]
  tile[4][3] = -1
  tile[3][4] = -1
  tile[4][4] = 1
}

function update_counts() {
  Black_Count = 0
  White_Count = 0
  for (col = 0; col < Cols; col++){       //x
    for (row = 0; row < Rows; row++){     //y
      if (tile[col][row] == -1) {
        Black_Count++
      }
      else if (tile[col][row] == 1) {
        White_Count++
      }
    }
  }
}

//Prepare Info Bar
function Draw_InfoBar () {
  update_counts()
  document.getElementById("BlackCount").innerHTML = Black_Count
  document.getElementById("WhiteCount").innerHTML = White_Count
  if (PlayerTurn == -1) {  
    document.getElementById("black_info").style.border = "3px dashed #777"
    document.getElementById("white_info").style.border = "none"
  }
  else {
    document.getElementById("black_info").style.border = "none"
    document.getElementById("white_info").style.border = "3px dashed #777"
  }
}

//Draw Tile Borders
function Draw_Board (){
  ctx.fillStyle = "green"
  ctx.fillRect(1, 1, (Cols-1)*tile_size + tile_size, (Rows-1)*tile_size+tile_size);

  ctx.strokeStyle = "black"
  ctx.strokeRect(1, 1, (Cols-1)*tile_size + tile_size, (Rows-1)*tile_size+tile_size);

  for (col = 0; col < Cols; col++){
    for (row = 0; row < Rows; row++){
      //console.log(col, row)
      ctx.strokeStyle = "black"
      ctx.strokeRect(col*tile_size, row*tile_size, tile_size, tile_size);
    }
  }
}

function Draw_Tiles() {
  for (col = 0; col < Cols; col++){
    for (row = 0; row < Rows; row++){
      if (tile[col][row] == -1) {
        ctx.fillStyle = "black"
        ctx.strokeStyle = "black"
        //console.log(col, row, tile[col][row], ctx.fillStyle, ctx.strokeStyle)
        ctx.beginPath();
        ctx.arc(col*tile_size+(tile_size/2), row*tile_size+(tile_size/2), tile_size_for_drawing/2, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
      }
      else if (tile[col][row] == 1) {
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        //console.log(col, row, tile[col][row], ctx.fillStyle, ctx.strokeStyle)
        ctx.beginPath();
        ctx.arc(col*tile_size+(tile_size/2), row*tile_size+(tile_size/2), tile_size_for_drawing/2, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  //last move marker
  if (state_history.length > 0) {
    var last_col = state_history[state_history.length-1][9]
    var last_row = state_history[state_history.length-1][10]
    ctx.font = "15px Ariel";
    ctx.fillStyle = "red";
    ctx.fillText("\xd7", last_col*tile_size+(tile_size/2)-3, last_row*tile_size+(tile_size/2)+3);
  }
}

//Detect Mouse Moves
var canvasElem = document.getElementById('main_canvas')
canvasElem.addEventListener("mouseup", function(e){
  let rect = canvas.getBoundingClientRect();
  let mouse_x = e.clientX - rect.left;
  let mouse_y = e.clientY - rect.top;
  Locate_Move(mouse_x, mouse_y)
  e.preventDefault()
}, false)
canvasElem.addEventListener("touchend", function(e){
  let touchobj = e.changedTouches[0]
  let rect = canvas.getBoundingClientRect();
  mouse_x = touchobj.clientX - rect.left;
  mouse_y = touchobj.clientY - rect.top;
  Locate_Move(mouse_x, mouse_y)
  e.preventDefault()
}, false)

//todo: need to de-hover on mobile touch events  


//Handle Moves
function Locate_Move(mouse_x, mouse_y) {
  located_row = 99
  located_col = 99
  for (var col = 0; col < Cols; col++){
    for (var row = 0; row < Rows; row++){
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
  Valid_Move = false
  if (located_col+2 < 8) {
    if (tile[located_col+1][located_row] == PlayerTurn*-1) {    //right
      for (i = 2; i < 8; i++) {
        if (located_col+i < 8) {
          if (tile[located_col+i][located_row] == PlayerTurn) {
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
    if (tile[located_col+1][located_row+1] == PlayerTurn*-1) {  //right-down
      for (i = 2; i < 8; i++) {
        if ((located_col+i < 8) && (located_row+i < 8)) {
          if (tile[located_col+i][located_row+i] == PlayerTurn) {
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
    if (tile[located_col][located_row+1] == PlayerTurn*-1) {  //down
      for (i = 2; i < 8; i++) {
        if (located_row+i < 8) {
          if (tile[located_col][located_row+i] == PlayerTurn) {
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
    if (tile[located_col-1][located_row+1] == PlayerTurn*-1) {  //down-left
      for (i = 2; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row+i < 8)) {
          if (tile[located_col-i][located_row+i] == PlayerTurn) {
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
    if (tile[located_col-1][located_row] == PlayerTurn*-1) {  //left
      for (i = 2; i < 8; i++) {
        if (located_col-i >= 0) {
          if (tile[located_col-i][located_row] == PlayerTurn) {
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
    if (tile[located_col-1][located_row-1] == PlayerTurn*-1) {  //left-up
      for (i = 2; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row-i >= 0)) {
          if (tile[located_col-i][located_row-i] == PlayerTurn) {
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
    if (tile[located_col][located_row-1] == PlayerTurn*-1) {  //up
      for (i = 2; i < 8; i++) {
        if (located_row-i >= 0) {
          if (tile[located_col][located_row-i] == PlayerTurn) {
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
    if (tile[located_col+1][located_row-1] == PlayerTurn*-1) {  //up-right
      for (i = 2; i < 8; i++) {
        if ((located_col+i < 8) && (located_row-i >= 0)) {
          if (tile[located_col+i][located_row-i] == PlayerTurn) {
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
    tile[located_col][located_row] = PlayerTurn // place piece
    Next_Move(located_col, located_row)
  }
  return Valid_Move
}

function Flip(located_col, located_row, direction, command) {
  if (command != "just_check") {
    //console.log("Flip ", direction)

    if (direction == "right") {
      for (i = 1; i < 8; i++) {
        if ((located_col+i < 8) && (tile[located_col+i][located_row] == PlayerTurn * -1)) {
          tile[located_col+i][located_row] = PlayerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "right-down") {
      for (i = 1; i < 8; i++) {
        if ((located_col+i < 8) && (located_row+i < 8) && (tile[located_col+i][located_row+i] == PlayerTurn * -1)) {
          tile[located_col+i][located_row+i] = PlayerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "down") {
      for (i = 1; i < 8; i++) {
        if ((located_row+i < 8) && (tile[located_col][located_row+i] == PlayerTurn * -1)) {
          tile[located_col][located_row+i] = PlayerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "down-left") {
      for (i = 1; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row+i < 8) && (tile[located_col-i][located_row+i] == PlayerTurn * -1)) {
          tile[located_col-i][located_row+i] = PlayerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "left") {
      for (i = 1; i < 8; i++) {
        if ((located_col-i >= 0) && (tile[located_col-i][located_row] == PlayerTurn * -1)) {
          tile[located_col-i][located_row] = PlayerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "left-up") {
      for (i = 1; i < 8; i++) {
        if ((located_col-i >= 0) && (located_row-i >= 0) && (tile[located_col-i][located_row-i] == PlayerTurn * -1)) {
          tile[located_col-i][located_row-i] = PlayerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "up") {
      for (i = 1; i < 8; i++) {
        if ((located_row-i >= 0) && (tile[located_col][located_row-i] == PlayerTurn * -1)) {
          tile[located_col][located_row-i] = PlayerTurn
        }
        else {
          break
        }
      }
    }
    if (direction == "up-right") {
      for (i = 1; i < 8; i++) {
        if ((located_col+i < 8) && (located_row-i >= 0) && (tile[located_col+i][located_row-i] == PlayerTurn * -1)) {
          tile[located_col+i][located_row-i] = PlayerTurn
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
  for (col = 0; col < Cols; col++){
    for (row = 0; row < Rows; row++){
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

function Next_Move(located_col, located_row) {
  PlayerTurn = PlayerTurn * -1;
  StateState(located_col, located_row); 
  RefreshBoard();

  if (CheckForPass()) {
    console.log("pass", PlayerTurn)
    PlayerTurn = PlayerTurn * -1; // change turns again

    //BUG: fatal error when robots are playing and there is a pass

    if (CheckForPass()) {
      console.log("double pass", PlayerTurn)
      console.log("game over");

      // stop robots
      PlayerTurn = 0
      console.log("PlayerTurn: ", PlayerTurn)

      // display credits
      if (Black_Count > White_Count) {  //todo: improve game over message
        document.getElementById("black_info").style.border = "3px dashed #777"
        document.getElementById("white_info").style.border = "none"
      } else if (Black_Count < White_Count) {
        document.getElementById("black_info").style.border = "none"
        document.getElementById("white_info").style.border = "3px dashed #777"
      } else if (Black_Count == White_Count) {
        document.getElementById("black_info").style.border = "3px dashed #777"
        document.getElementById("white_info").style.border = "3px dashed #777"
      }
    } else {                                              //BUG when robots are passing?
      if (PlayerTurn == -1 && BlackRobotOn) {
        GoRobot();
      } else if (PlayerTurn == 1 && WhiteRobotOn) {
        GoRobot();
      }
    }
  } else {
    if (PlayerTurn == -1 && BlackRobotOn) {
      GoRobot();
    } else if (PlayerTurn == 1 && WhiteRobotOn) {
      GoRobot();
    }
  }
}


//Save State & Back Button
var moves_history = []
function StateState(located_col, located_row) {       //BUG: not saving state correctly on passes
  console.log("saving state: ", PlayerTurn, located_col, located_row)

  tilec = JSON.parse(JSON.stringify(tile))
  state_history.push([])
  for (col = 0; col < Cols; col++){          //record state (for back button)
    state_history[state_history.length-1].push([])
    for (row = 0; row < Rows; row++){
      state_history[state_history.length-1][col].push(tilec[col][row])
    }
  }
  state_history[state_history.length-1].push(PlayerTurn)
  state_history[state_history.length-1].push(located_col)
  state_history[state_history.length-1].push(located_row)

  //current_move = (located_col) + (located_row)*8      //0...63
  //moves_history.push(current_move)
}

function BackBtn() {
  state_history.pop()   //remove last move from moves_history
  state_historyc = JSON.parse(JSON.stringify(state_history))

  clear_board()          //clear tiles

  if (state_historyc.length > 0) {

    for (col = 0; col < Cols; col++){                           //record state (for back button)
      for (row = 0; row < Rows; row++){
        tile[col][row] = state_historyc[state_historyc.length-1][col][row]
      }
    }
    PlayerTurn = state_historyc[state_historyc.length-1][8]
    RefreshBoard()
  }
  else {
    NewGame ()
  }
}


//Robot Buttons
var BlackRobotOn = false
function BlackRobotBtn() {

  //manual dehover on mobile
  document.getElementById("black_robot_button").className = 'input-dehover'
  document.getElementById("white_robot_button").className = 'input-dehover'
  console.log("dehovering")

  //change status and trigger play if it is the robot's turn
  if (BlackRobotOn == true) {
    BlackRobotOn = false
    document.getElementById("black_robot_button").style.backgroundColor = '';
    document.getElementById("black_robot_button").value = "Human"
  }
  else {
    BlackRobotOn = true
    document.getElementById("black_robot_button").style.backgroundColor = '#C8C8C8'
    document.getElementById("black_robot_button").value = "Robot"
    if (PlayerTurn == -1) {
      GoRobot()
    }
  }
}
var WhiteRobotOn = false
function WhiteRobotBtn() {
  if (WhiteRobotOn == true) {
    WhiteRobotOn = false
    document.getElementById("white_robot_button").style.backgroundColor = ''
    document.getElementById("white_robot_button").value = "Human"
    
  }
  else {
    WhiteRobotOn = true
    document.getElementById("white_robot_button").style.backgroundColor = '#C8C8C8'
    document.getElementById("white_robot_button").value = "Robot"
    if (PlayerTurn == 1) {
      GoRobot()
    }
  }
}