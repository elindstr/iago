console.log("robots.js loaded")

var moves
var states
var disc_count
var move_count

function GoRobot() {
  console.log("robot thinking", playerTurn)
  state_to_evaluatea = stateHistory[stateHistory.length-1]    //BUG: When a robot passes, this incorrectly shows no potential moves. 
  state_to_evaluate = JSON.parse(JSON.stringify(state_to_evaluatea))
 

  //get potential moves and states
  let [moves, states, your_disc_count, your_move_count, oppo_disc_count, oppo_move_count] = get_state_stats(state_to_evaluate)       //find potential moves
  console.log(moves, states)

  //get robot move
  var [robotMoveX, robotMoveY] = RobotMiddleQuads(state_to_evaluate, moves)
  //console.log(robotMoveX)
  //console.log(robotMoveY)

  //implement
  Check_Move(robotMoveX, robotMoveY, "flip")
}

function get_state_stats(state_to_evaluate) {
  potential_moves = []  //potential moves
  potential_states = [] //state resulting from each potential move
  your_disc_count = []  //your disc count resulting from each potential move
  your_move_count = []  //your moves available from resulting from each potential move
  oppo_disc_count = []  //opponent's disc count resulting from each potential move
  oppo_move_count = []  //opponent's moves available from resulting from each potential move

  var [potential_moves, potential_states] = get_moves_and_states(state_to_evaluate)
  //console.log(potential_moves, potential_states)
  return [potential_moves, potential_states, your_disc_count, your_move_count, oppo_disc_count, oppo_move_count]
}

function get_moves_and_states(state_to_evaluate) {
  potential_PlayerTurn = state_to_evaluate[8]           //BUG: when robots pass, the current turn gets messed up
  moves = []
  //console.log("turn ", potential_PlayerTurn)
  potential_moves_a = []
  potential_states = []

  //check moves, report back potential moves and potential states
  for (col = 0; col < 8; col++) {
    for (row = 0; row < 8; row++) {
      if (state_to_evaluate[col][row] == 0) {
        var [potential_moves_input, potential_states_input] = Robot_Find_Moves(col, row, potential_PlayerTurn, state_to_evaluate)
        if (potential_moves_input.length > 0) {
          potential_moves_a.push(potential_moves_input)
          potential_states_inputa = JSON.parse(JSON.stringify(potential_states_input))
          potential_states.push(potential_states_inputa)
        }
      }
    }
  }

  return [potential_moves_a, potential_states]
}


function Robot_Find_Moves(pot_col, pot_row, pot_turn, state_to_evaluate) {
  potential_moves = []
  new_states = []

  if (pot_col+2 < 8) {
    if (state_to_evaluate[pot_col+1][pot_row] == pot_turn*-1) {    //right
      for (i = 2; i < 8; i++) {
        if (pot_col+i < 8) {
          if (state_to_evaluate[pot_col+i][pot_row] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "right", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move R: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col+i][pot_row] == 0) {
            break
          }
        }
      }
    }
  }

  if ((pot_col+2 < 8) && (pot_row+2 < 8)) {
    if (state_to_evaluate[pot_col+1][pot_row+1] == pot_turn*-1) {  //right-down
      for (i = 2; i < 8; i++) {
        if ((pot_col+i < 8) && (pot_row+i < 8)) {
          if (state_to_evaluate[pot_col+i][pot_row+i] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "right-down", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move RD: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col+i][pot_row+i] == 0) {
            break
          }
        }
      }
    }
  }
  if (pot_row+2 < 8) {
    if (state_to_evaluate[pot_col][pot_row+1] == pot_turn*-1) {  //down
      for (i = 2; i < 8; i++) {
        if (pot_row+i < 8) {
          if (state_to_evaluate[pot_col][pot_row+i] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "down", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move D: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col][pot_row+i] == 0) {
            break
          }
        }
      }
    }
  }
  if ((pot_col-2 >= 0) && (pot_row+2 < 8)) {
    if (state_to_evaluate[pot_col-1][pot_row+1] == pot_turn*-1) {  //down-left
      for (i = 2; i < 8; i++) {
        if ((pot_col-i >= 0) && (pot_row+i < 8)) {
          if (state_to_evaluate[pot_col-i][pot_row+i] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "down-left", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move DL: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col-i][pot_row+i] == 0) {
            break
          }
        }
      }
    }
  }
  if (pot_col-2 >= 0) {
    if (state_to_evaluate[pot_col-1][pot_row] == pot_turn*-1) {  //left
      for (i = 2; i < 8; i++) {
        if (pot_col-i >= 0) {
          if (state_to_evaluate[pot_col-i][pot_row] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "left", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move L: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col-i][pot_row] == 0) {
            break
          }
        }
      }
    }
  }
  if ((pot_col-2 >= 0) && (pot_row-2 >= 0)) {
    if (state_to_evaluate[pot_col-1][pot_row-1] == pot_turn*-1) {  //left-up
      for (i = 2; i < 8; i++) {
        if ((pot_col-i >= 0) && (pot_row-i >= 0)) {
          if (state_to_evaluate[pot_col-i][pot_row-i] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "left-up", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move LU: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col-i][pot_row-i] == 0) {
            break
          }
        }
      }
    }
  }
  if (pot_row-2 >= 0) {
    if (state_to_evaluate[pot_col][pot_row-1] == pot_turn*-1) {  //up
      for (i = 2; i < 8; i++) {
        if (pot_row-i >= 0) {
          if (state_to_evaluate[pot_col][pot_row-i] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "up", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move U: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col][pot_row-i] == 0) {
            break
          }
        }
      }
    }
  }
  if ((pot_col+2 < 8) && (pot_row-2 >= 0)) {
    if (state_to_evaluate[pot_col+1][pot_row-1] == pot_turn*-1) {  //up-right
      for (i = 2; i < 8; i++) {
        if ((pot_col+i < 8) && (pot_row-i >= 0)) {
          if (state_to_evaluate[pot_col+i][pot_row-i] == pot_turn) {
            potential_moves.push([pot_col, pot_row])
            new_statea = Robot_Flip(pot_col, pot_row, "up-right", pot_turn, state_to_evaluate)
            new_state = JSON.parse(JSON.stringify(new_statea))
            new_states.push(new_state)
            //console.log("found move UR: ", pot_col, pot_row, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col+i][pot_row-i] == 0) {
            break
          }
        }
      }
    }
  }
  //console.log(potential_moves, new_states)
  return [potential_moves, new_states]
}


function Robot_Flip(pot_col, pot_row, direction, pot_turn, state_to_evaluate) {

  //new potential state (for each potential move)
  new_state = JSON.parse(JSON.stringify(state_to_evaluate))

  //add new piece
  new_state[pot_col][pot_row] = pot_turn

  //implement flip
  if (direction == "right") {
    for (i = 1; i < 8; i++) {
      if ((pot_col+i < 8) && (new_state[pot_col+i][pot_row] == pot_turn * -1)) {
        new_state[pot_col+i][pot_row] = pot_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "right-down") {
    for (i = 1; i < 8; i++) {
      if ((pot_col+i < 8) && (pot_row+i < 8) && (new_state[pot_col+i][pot_row+i] == pot_turn * -1)) {
        new_state[pot_col+i][pot_row+i] = pot_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "down") {
    for (i = 1; i < 8; i++) {
      if ((pot_row+i < 8) && (new_state[pot_col][pot_row+i] == pot_turn * -1)) {
        new_state[pot_col][pot_row+i] = pot_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "down-left") {
    for (i = 1; i < 8; i++) {
      if ((pot_col-i >= 0) && (pot_row+i < 8) && (new_state[pot_col-i][pot_row+i] == pot_turn * -1)) {
        new_state[pot_col-i][pot_row+i] = pot_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "left") {
    for (i = 1; i < 8; i++) {
      if ((pot_col-i >= 0) && (new_state[pot_col-i][pot_row] == pot_turn * -1)) {
        new_state[pot_col-i][pot_row] = pot_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "left-up") {
    for (i = 1; i < 8; i++) {
      if ((pot_col-i >= 0) && (pot_row-i >= 0) && (new_state[pot_col-i][pot_row-i] == pot_turn * -1)) {
        new_state[pot_col-i][pot_row-i] = pot_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "up") {
    for (i = 1; i < 8; i++) {
      if ((pot_row-i >= 0) && (new_state[pot_col][pot_row-i] == pot_turn * -1)) {
        new_state[pot_col][pot_row-i] = pot_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "up-right") {
    for (i = 1; i < 8; i++) {
      if ((pot_col+i < 8) && (pot_row-i >= 0) && (new_state[pot_col+i][pot_row-i] == pot_turn * -1)) {
        new_state[pot_col+i][pot_row-i] = pot_turn
      }
      else {
        break
      }
    }
  }

  //console.log(new_state)
  return new_state
}
