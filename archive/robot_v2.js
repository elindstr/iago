var Look_Ahead = {}
function GoRobot_BAK() {
  console.log("robot thinking")
  var moves_to_lookahead = 2

  //copy variables I want to work with, but don't want to distrub
  state_to_evaluate = JSON.parse(JSON.stringify(tile))
  current_turn = JSON.parse(JSON.stringify(PlayerTurn))

  //evaluate potential moves (1-move look ahead)
  console.log("GoRobot: Analyzing scope 0.")
  var [potential_moves, potential_states, your_disc_count, oppo_disc_count, oppo_move_count] = Robot_get_state_stats(state_to_evaluate, current_turn)       //find and evaluate potential moves
  Look_Ahead[0] = {
    current_turn: current_turn,
    prior_move: 0,
    potential_moves: potential_moves,
    potential_states: potential_states,
    your_disc_counts: your_disc_count,
    oppo_disc_counts: oppo_disc_count,
    oppo_move_counts: oppo_move_count
  }
  console.log("GoRobot: Found: ", Look_Ahead[0].potential_moves.length, " moves and ", Look_Ahead[0].potential_states.length, " states in scope 0.")

  //iterate through potential moves in next state_ahead
  for (scope = 1; scope <= moves_to_lookahead; scope++) {
    console.log("GoRobot: Analyzing scope", scope)
    Look_Ahead[scope] = {
      current_turn: 0,
      prior_move: [],
      potential_moves: [],
      potential_states: [],
      your_disc_counts: [],
      oppo_disc_counts: [],
      oppo_move_counts: []
    }

    for (move = 0; move < Look_Ahead[scope-1].potential_moves.length; move++){
      state_to_evaluate=[]
      state_to_evaluate = JSON.parse(JSON.stringify(Look_Ahead[scope-1].potential_states[move]))

      console.log("GoRobot: Analyzing scope:", scope, "move:", Look_Ahead[scope-1].potential_moves[move], "in state:", state_to_evaluate)
      turn = Look_Ahead[scope-1].current_turn * -1
      Look_Ahead[scope].current_turn = turn
      var [next_potential_move, next_potential_state, next_your_disc_count, next_oppo_disc_count, next_oppo_move_count] = Robot_get_state_stats(state_to_evaluate, turn)       //find and evaluate potential moves
      Look_Ahead[scope].prior_move.push(move)
      Look_Ahead[scope].potential_moves.push(next_potential_move)
      Look_Ahead[scope].potential_states.push(next_potential_state)   //multiple states per move on scope greater than 1?
      Look_Ahead[scope].your_disc_counts.push(next_your_disc_count)
      Look_Ahead[scope].oppo_disc_counts.push(next_oppo_disc_count)
      Look_Ahead[scope].oppo_move_counts.push(next_oppo_move_count)
      console.log("GoRobot: Found: ", Look_Ahead[scope].potential_moves.length, " moves and ", Look_Ahead[scope].potential_states.length, " states.")
    }
  }

  //select among potential moves
    //...


  //Next_Move(col, row)
  RefreshBoard()
}

function Robot_get_state_stats(state_to_evaluate, current_turn) {
  var potential_moves = []  //potential moves
  var potential_states = [] //state resulting from each potential move

  var your_disc_count = []  //your disc count resulting from each potential move
  var oppo_disc_count = []  //opponent's disc count resulting from each potential move
  var oppo_move_count = []  //your moves available from resulting from each potential move
  var potential_black_count = 0
  var potential_white_count = 0

  //get moves and states
  var [potential_moves, potential_states] = Robot_get_moves_and_states(state_to_evaluate, current_turn)
  console.log("get_state_stats (locating moves and states): Found", potential_moves.length, " potential moves:", potential_moves)

  //get counts of potential states
  for (getmoves_state = 0; getmoves_state < potential_states.length; getmoves_state++) {
    console.log("get_state_stats: gettings stats on potential state: ", getmoves_state, " of ", potential_states.length, potential_states[getmoves_state])
    potential_black_count = 0
    potential_white_count = 0

    //get disc counts
    for (col = 0; col < Cols; col++){
      for (row = 0; row < Rows; row++){
        if (potential_states[getmoves_state][col][row] == -1) {
          potential_black_count=potential_black_count+1
        }
        else if (potential_states[getmoves_state][col][row] == 1) {potential_white_count=potential_white_count+1}
      }
    }
    //console.log(potential_black_count, potential_white_count, your_disc_count, oppo_disc_count)

    if (current_turn == -1) {
      your_disc_count.push(potential_black_count)
      oppo_disc_count.push(potential_white_count)
    }
    else {
      your_disc_count.push(potential_white_count)
      oppo_disc_count.push(potential_black_count)
    }

    //get oppo move count
    var [potential_moves_next, potential_states_next] = Robot_get_moves_and_states(potential_states[getmoves_state], current_turn*-1)
    oppo_move_count.push(potential_moves_next.length)
    //console.log(potential_states_next)
  }

  //console.log("potential_moves: ", potential_moves, "; your_disc_count: ", your_disc_count, "; oppo_disc_count: ", oppo_disc_count)
  return [potential_moves, potential_states, your_disc_count, oppo_disc_count, oppo_move_count]
}

function Robot_get_moves_and_states(state_to_evaluate, current_turn) {
  //console.log(state_to_evaluate)
  var moves = []
  var potential_moves = []
  var potential_states = []

  //check moves, report back potential moves and potential states
  for (col = 0; col < Cols; col++){
    for (row = 0; row < Rows; row++){
      if (state_to_evaluate[col][row] == 0) {
        var [potential_move, potential_state] = Robot_Find_Moves(col, row, current_turn, state_to_evaluate)
        //console.log("found potential move: ", potential_moves, " with state: ", potential_states)
        if (potential_move.length > 0) {
          potential_moves.push(potential_move)
          potential_states.push(potential_state)
        }
      }
    }
  }

  console.log("get_moves_and_states: found ", potential_moves.length, " potential moves: ", potential_moves, potential_states)
  return [potential_moves, potential_states]
}

function Robot_Find_Moves(pot_col, pot_row, current_turn, state_to_evaluate) {
  potential_move = []
  new_state = []

  if (pot_col+2 < 8) {
    if (state_to_evaluate[pot_col+1][pot_row] == current_turn*-1) {    //right
      for (i = 2; i < 8; i++) {
        if (pot_col+i < 8) {
          if (state_to_evaluate[pot_col+i][pot_row] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "right", current_turn, state_to_evaluate)
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
    if (state_to_evaluate[pot_col+1][pot_row+1] == current_turn*-1) {  //right-down
      for (i = 2; i < 8; i++) {
        if ((pot_col+i < 8) && (pot_row+i < 8)) {
          if (state_to_evaluate[pot_col+i][pot_row+i] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "right-down", current_turn, state_to_evaluate)
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
    if (state_to_evaluate[pot_col][pot_row+1] == current_turn*-1) {  //down
      for (i = 2; i < 8; i++) {
        if (pot_row+i < 8) {
          if (state_to_evaluate[pot_col][pot_row+i] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "down", current_turn, state_to_evaluate)
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
    if (state_to_evaluate[pot_col-1][pot_row+1] == current_turn*-1) {  //down-left
      for (i = 2; i < 8; i++) {
        if ((pot_col-i >= 0) && (pot_row+i < 8)) {
          if (state_to_evaluate[pot_col-i][pot_row+i] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "down-left", current_turn, state_to_evaluate)
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
    if (state_to_evaluate[pot_col-1][pot_row] == current_turn*-1) {  //left
      for (i = 2; i < 8; i++) {
        if (pot_col-i >= 0) {
          if (state_to_evaluate[pot_col-i][pot_row] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "left", current_turn, state_to_evaluate)
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
    if (state_to_evaluate[pot_col-1][pot_row-1] == current_turn*-1) {  //left-up
      for (i = 2; i < 8; i++) {
        if ((pot_col-i >= 0) && (pot_row-i >= 0)) {
          if (state_to_evaluate[pot_col-i][pot_row-i] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "left-up", current_turn, state_to_evaluate)
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
    if (state_to_evaluate[pot_col][pot_row-1] == current_turn*-1) {  //up
      for (i = 2; i < 8; i++) {
        if (pot_row-i >= 0) {
          if (state_to_evaluate[pot_col][pot_row-i] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "up", current_turn, state_to_evaluate)
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
    if (state_to_evaluate[pot_col+1][pot_row-1] == current_turn*-1) {  //up-right
      for (i = 2; i < 8; i++) {
        if ((pot_col+i < 8) && (pot_row-i >= 0)) {
          if (state_to_evaluate[pot_col+i][pot_row-i] == current_turn) {
            potential_move = [pot_col, pot_row]
            new_state = Robot_Flip(pot_col, pot_row, "up-right", current_turn, state_to_evaluate)
            break
          }
          else if (state_to_evaluate[pot_col+i][pot_row-i] == 0) {
            break
          }
        }
      }
    }
  }

  if (potential_move.length > 0) {
    //console.log(potential_move, new_state)
  }
  return [potential_move, new_state]
}

function Robot_Flip(pot_col, pot_row, direction, current_turn, state_to_evaluate) {

  //new potential state (for each potential move)
  new_state = JSON.parse(JSON.stringify(tile))

  //add new piece
  new_state[pot_col][pot_row] = current_turn

  //implement hypothetical flip
  if (direction == "right") {
    for (i = 1; i < 8; i++) {
      if ((pot_col+i < 8) && (new_state[pot_col+i][pot_row] == current_turn * -1)) {
        new_state[pot_col+i][pot_row] = current_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "right-down") {
    for (i = 1; i < 8; i++) {
      if ((pot_col+i < 8) && (pot_row+i < 8) && (new_state[pot_col+i][pot_row+i] == current_turn * -1)) {
        new_state[pot_col+i][pot_row+i] = current_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "down") {
    for (i = 1; i < 8; i++) {
      if ((pot_row+i < 8) && (new_state[pot_col][pot_row+i] == current_turn * -1)) {
        new_state[pot_col][pot_row+i] = current_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "down-left") {
    for (i = 1; i < 8; i++) {
      if ((pot_col-i >= 0) && (pot_row+i < 8) && (new_state[pot_col-i][pot_row+i] == current_turn * -1)) {
        new_state[pot_col-i][pot_row+i] = current_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "left") {
    for (i = 1; i < 8; i++) {
      if ((pot_col-i >= 0) && (new_state[pot_col-i][pot_row] == current_turn * -1)) {
        new_state[pot_col-i][pot_row] = current_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "left-up") {
    for (i = 1; i < 8; i++) {
      if ((pot_col-i >= 0) && (pot_row-i >= 0) && (new_state[pot_col-i][pot_row-i] == current_turn * -1)) {
        new_state[pot_col-i][pot_row-i] = current_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "up") {
    for (i = 1; i < 8; i++) {
      if ((pot_row-i >= 0) && (new_state[pot_col][pot_row-i] == current_turn * -1)) {
        new_state[pot_col][pot_row-i] = current_turn
      }
      else {
        break
      }
    }
  }
  if (direction == "up-right") {
    for (i = 1; i < 8; i++) {
      if ((pot_col+i < 8) && (pot_row-i >= 0) && (new_state[pot_col+i][pot_row-i] == current_turn * -1)) {
        new_state[pot_col+i][pot_row-i] = current_turn
      }
      else {
        break
      }
    }
  }

  //console.log(new_state)
  return new_state
}
