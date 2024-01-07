console.log("robots_quads.js loaded")

function RobotMiddleQuads (state_to_evaluate, moves) {

  //sloppily building variables for the ios RobotMiddleQuads function
  Potential_MoveX = []
  Potential_MoveY = []
  for (var i=0; i < moves.length; i++) {
    Potential_MoveX.push(moves[i][0][0])
    Potential_MoveY.push(moves[i][0][1])
  }
  move_tracker = playerTurn
  let Moves = moves.length
  var moveX = 0
  var moveY = 0
  console.log("Starting:")
  console.log(Potential_MoveX)
  console.log(Potential_MoveY)

  //remove potentials next to corner (unless crawling)
  var Mod_Potential_MoveX = JSON.parse(JSON.stringify(Potential_MoveX))
  var Mod_Potential_MoveY = JSON.parse(JSON.stringify(Potential_MoveY))

  //console.log(Potential_MoveX.length-1)
  for (var i = Potential_MoveX.length-1; i > -1; i--) {
  //for i in (0...Potential_MoveX.length-1).reversed() {
      if (state_to_evaluate[0][0] != move_tracker) {
          if ((Potential_MoveX[i] == 1) && (Potential_MoveY[i] == 0) && (Mod_Potential_MoveX.length > 0) ){
              //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 0) && (Potential_MoveY[i] == 1) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 1) && (Potential_MoveY[i] == 1) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
      }
      if (state_to_evaluate[0][7] != move_tracker) {
          if ((Potential_MoveX[i] == 6) && (Potential_MoveY[i] == 0) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 6) && (Potential_MoveY[i] == 1) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 7) && (Potential_MoveY[i] == 1) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
      }
      if (state_to_evaluate[7][0] != move_tracker) {
          if ((Potential_MoveX[i] == 0) && (Potential_MoveY[i] == 6) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 1) && (Potential_MoveY[i] == 6) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 1) && (Potential_MoveY[i] == 7) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
      }
      if (state_to_evaluate[7][7] != move_tracker) {
          if ((Potential_MoveX[i] == 6) && (Potential_MoveY[i] == 6) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 6) && (Potential_MoveY[i] == 7) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
          if ((Potential_MoveX[i] == 7) && (Potential_MoveY[i] == 6) && (Mod_Potential_MoveX.length > 0)){
            //console.log(Mod_Potential_MoveX.length)
              Mod_Potential_MoveX.splice(i, 1)
              Mod_Potential_MoveY.splice(i, 1)
          }
      }
  }
  if (Mod_Potential_MoveX.length == 0 ) {
    //console.log(Mod_Potential_MoveX.length)
      Mod_Potential_MoveX.push(Potential_MoveX[0])
      Mod_Potential_MoveY.push(Potential_MoveY[0])
  }
  console.log("After removing potentials next to corner:")
  console.log(Mod_Potential_MoveX)
  console.log(Mod_Potential_MoveX)


  //remove middle sides (unless crawling)
  var Mod_Potential_MoveX2 = JSON.parse(JSON.stringify(Mod_Potential_MoveX))
  var Mod_Potential_MoveY2 = JSON.parse(JSON.stringify(Mod_Potential_MoveY))

  for (var i = Mod_Potential_MoveX2.length-1; i = 0; i--) {
  //for i in (0...Mod_Potential_MoveX2.length-1).reversed() {
      if ((state_to_evaluate[0][0] != move_tracker) && (state_to_evaluate[1][0] != move_tracker) && (state_to_evaluate[2][0] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 0) && (Mod_Potential_MoveY[i] == 3) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
      if ((state_to_evaluate[5][0] != move_tracker) && (state_to_evaluate[6][0] != move_tracker) && (state_to_evaluate[7][0] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 0) && (Mod_Potential_MoveY[i] == 4) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
      if ((state_to_evaluate[0][0] != move_tracker) && (state_to_evaluate[0][1] != move_tracker) && (state_to_evaluate[0][2] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 3) && (Mod_Potential_MoveY[i] == 0) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
      if ((state_to_evaluate[0][5] != move_tracker) && (state_to_evaluate[0][6] != move_tracker) && (state_to_evaluate[0][7] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 4) && (Mod_Potential_MoveY[i] == 0) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
      if ((state_to_evaluate[7][0] != move_tracker) && (state_to_evaluate[7][1] != move_tracker) && (state_to_evaluate[7][2] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 3) && (Mod_Potential_MoveY[i] == 7) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
      if ((state_to_evaluate[7][5] != move_tracker) && (state_to_evaluate[7][6] != move_tracker) && (state_to_evaluate[7][7] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 4) && (Mod_Potential_MoveY[i] == 7) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
      if ((state_to_evaluate[0][7] != move_tracker) && (state_to_evaluate[1][7] != move_tracker) && (state_to_evaluate[2][7] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 7) && (Mod_Potential_MoveY[i] == 3) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
      if ((state_to_evaluate[5][7] != move_tracker) && (state_to_evaluate[6][7] != move_tracker) && (state_to_evaluate[7][7] != move_tracker)) {
          if ((Mod_Potential_MoveX[i] == 7) && (Mod_Potential_MoveY[i] == 4) && (Mod_Potential_MoveX2.length > 0)){
              Mod_Potential_MoveX2.splice(i, 1)
              Mod_Potential_MoveY2.splice(i, 1)
          }
      }
  }
  if (Mod_Potential_MoveX2.length == 0 ) {
      Mod_Potential_MoveX2.push(Mod_Potential_MoveX[0])
      Mod_Potential_MoveY2.push(Mod_Potential_MoveY[0])
  }


  //remove quad sides, unless crawling
  var Mod_Potential_MoveX3 = JSON.parse(JSON.stringify(Mod_Potential_MoveX2))
  var Mod_Potential_MoveY3 = JSON.parse(JSON.stringify(Mod_Potential_MoveY2))

  for (var i = Mod_Potential_MoveX3.length-1; i = 0; i--) {
  //for i in (0...Mod_Potential_MoveX3.length-1).reversed() {
      if ((state_to_evaluate[0][0] != move_tracker) && (state_to_evaluate[1][0] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 0) && (Mod_Potential_MoveY2[i] == 2) && (Mod_Potential_MoveX3.length > 0)) {
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
      if ((state_to_evaluate[6][0] != move_tracker) && (state_to_evaluate[7][0] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 0) && (Mod_Potential_MoveY2[i] == 5) && (Mod_Potential_MoveX3.length > 0)){
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
      if ((state_to_evaluate[0][0] != move_tracker) && (state_to_evaluate[0][1] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 2) && (Mod_Potential_MoveY2[i] == 0) && (Mod_Potential_MoveX3.length > 0)){
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
      if ((state_to_evaluate[0][6] != move_tracker) && (state_to_evaluate[0][7] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 5) && (Mod_Potential_MoveY2[i] == 0) && (Mod_Potential_MoveX3.length > 0)){
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
      if ((state_to_evaluate[7][0] != move_tracker) && (state_to_evaluate[7][1] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 2) && (Mod_Potential_MoveY2[i] == 7) && (Mod_Potential_MoveX3.length > 0)){
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
      if ((state_to_evaluate[7][6] != move_tracker) && (state_to_evaluate[7][7] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 5) && (Mod_Potential_MoveY2[i] == 7) && (Mod_Potential_MoveX3.length > 0)){
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
      if ((state_to_evaluate[0][7] != move_tracker) && (state_to_evaluate[1][7] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 7) && (Mod_Potential_MoveY2[i] == 2) && (Mod_Potential_MoveX3.length > 0)){
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
      if ((state_to_evaluate[6][7] != move_tracker) && (state_to_evaluate[7][7] != move_tracker)) {
          if ((Mod_Potential_MoveX2[i] == 7) && (Mod_Potential_MoveY2[i] == 5) && (Mod_Potential_MoveX3.length > 0)){
              Mod_Potential_MoveX3.splice(i, 1)
              Mod_Potential_MoveY3.splice(i, 1)
          }
      }
  }
  if (Mod_Potential_MoveX3.length == 0 ) {
      Mod_Potential_MoveX3.push(Mod_Potential_MoveX2[0])
      Mod_Potential_MoveY3.push(Mod_Potential_MoveY2[0])
  }

  //stay in box of 16
  var Mod_Potential_MoveX4 = JSON.parse(JSON.stringify(Mod_Potential_MoveX3))
  var Mod_Potential_MoveY4 = JSON.parse(JSON.stringify(Mod_Potential_MoveY3))
  if (Moves < 16) {
      for (var i = Mod_Potential_MoveX4.length-1; i = 0; i--) {
      //for i in (0...Mod_Potential_MoveX4.length-1).reversed() {

          if ((Mod_Potential_MoveX3[i] == 0) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 1) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 2) && (Mod_Potential_MoveY3[i] == 0) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 2) && (Mod_Potential_MoveY3[i] == 1) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 2) && (Mod_Potential_MoveY3[i] == 6) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 2) && (Mod_Potential_MoveY3[i] == 7) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 3) && (Mod_Potential_MoveY3[i] == 0) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 3) && (Mod_Potential_MoveY3[i] == 1) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 3) && (Mod_Potential_MoveY3[i] == 6) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 3) && (Mod_Potential_MoveY3[i] == 7) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 4) && (Mod_Potential_MoveY3[i] == 0) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 4) && (Mod_Potential_MoveY3[i] == 1) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 4) && (Mod_Potential_MoveY3[i] == 6) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 4) && (Mod_Potential_MoveY3[i] == 7) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 5) && (Mod_Potential_MoveY3[i] == 0) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 5) && (Mod_Potential_MoveY3[i] == 1) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 5) && (Mod_Potential_MoveY3[i] == 6) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 5) && (Mod_Potential_MoveY3[i] == 7) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 6) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
          if ((Mod_Potential_MoveX3[i] == 7) && (Mod_Potential_MoveX4.length > 0) ) {
              Mod_Potential_MoveX4.splice(i, 1)
              Mod_Potential_MoveY4.splice(i, 1)
          }
      }
  }

  if (Mod_Potential_MoveX4.length == 0 ) {
      Mod_Potential_MoveX4.push(Mod_Potential_MoveX3[0])
      Mod_Potential_MoveY4.push(Mod_Potential_MoveY3[0])
      moveX = Mod_Potential_MoveX4[0]
      moveY = Mod_Potential_MoveY4[0]
  }
  else {
      rnd_min = 0
      rnd_max = Mod_Potential_MoveX4.length
      rnd_id = Math.floor(Math.random() * (rnd_max - rnd_min) + rnd_min); //The maximum is exclusive and the minimum is inclusive
      //let random_pot_id = round(Double((Int.random(in: 0...1) * (Mod_Potential_MoveX4.length-1))))
      moveX = Mod_Potential_MoveX4[rnd_id]
      moveY = Mod_Potential_MoveY4[rnd_id]
  }

  if (Moves > 30) {
      //take corner
      for (var i = Mod_Potential_MoveX4.length-1; i = 0; i--) {
      //for i in (0...Mod_Potential_MoveX4.length-1).reversed() {
          if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 0) ){
              moveX = Mod_Potential_MoveX4[i]
              moveY = Mod_Potential_MoveY4[i]
          }
          else if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 7) ){
              moveX = Mod_Potential_MoveX4[i]
              moveY = Mod_Potential_MoveY4[i]
          }
          else if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 7) ){
              moveX = Mod_Potential_MoveX4[i]
              moveY = Mod_Potential_MoveY4[i]
          }
          else if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 0) ){
              moveX = Mod_Potential_MoveX4[i]
              moveY = Mod_Potential_MoveY4[i]
          }
          else {
              moveX = Mod_Potential_MoveX4[0]
              moveY = Mod_Potential_MoveY4[0]
          }


          //if corner taken, take adjacencies
          if ((state_to_evaluate[0][0] == move_tracker)) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 1) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 1) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 1) && (Mod_Potential_MoveY4[i] == 1) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][0] == move_tracker)) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 6) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 1) && (Mod_Potential_MoveY4[i] == 6) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 1) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][7] == move_tracker)) {
              if ((Mod_Potential_MoveX4[i] == 6) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 6) && (Mod_Potential_MoveY4[i] == 1) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 1) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][7] == move_tracker)) {
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 6) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 6) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 6) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }

          //if corner and adjacencies, crawl sides
          if ((state_to_evaluate[0][0] == move_tracker) && (state_to_evaluate[0][1] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 2) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][0] == move_tracker) && (state_to_evaluate[0][1] == move_tracker) && (state_to_evaluate[0][2] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 3) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][0] == move_tracker) && (state_to_evaluate[0][1] == move_tracker) && (state_to_evaluate[0][2] == move_tracker) && (state_to_evaluate[0][3] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 4) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }


          if ((state_to_evaluate[0][0] == move_tracker) && (state_to_evaluate[1][0] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 2) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][0] == move_tracker) && (state_to_evaluate[1][0] == move_tracker) && (state_to_evaluate[2][0] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 3) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][0] == move_tracker) && (state_to_evaluate[1][0] == move_tracker) && (state_to_evaluate[2][0] == move_tracker) && (state_to_evaluate[3][0] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 4) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }


          if ((state_to_evaluate[0][7] == move_tracker) && (state_to_evaluate[1][7] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 2) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][7] == move_tracker) && (state_to_evaluate[1][7] == move_tracker) && (state_to_evaluate[2][7] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 3) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][7] == move_tracker) && (state_to_evaluate[1][7] == move_tracker) && (state_to_evaluate[2][7] == move_tracker) && (state_to_evaluate[3][7] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 4) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }


          if ((state_to_evaluate[0][7] == move_tracker) && (state_to_evaluate[0][6] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 5) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][7] == move_tracker) && (state_to_evaluate[0][6] == move_tracker) && (state_to_evaluate[0][5] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 4) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[0][7] == move_tracker) && (state_to_evaluate[0][6] == move_tracker) && (state_to_evaluate[0][5] == move_tracker) && (state_to_evaluate[0][4] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 3) && (Mod_Potential_MoveY4[i] == 0) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }

          if ((state_to_evaluate[7][0] == move_tracker) && (state_to_evaluate[7][1] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 2) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][0] == move_tracker) && (state_to_evaluate[7][1] == move_tracker) && (state_to_evaluate[7][2] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 3) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][0] == move_tracker) && (state_to_evaluate[7][1] == move_tracker) && (state_to_evaluate[7][2] == move_tracker) && (state_to_evaluate[7][3] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 4) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }

          if ((state_to_evaluate[7][0] == move_tracker) && (state_to_evaluate[6][0] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 5) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][0] == move_tracker) && (state_to_evaluate[6][0] == move_tracker) && (state_to_evaluate[5][0] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 4) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][0] == move_tracker) && (state_to_evaluate[6][0] == move_tracker) && (state_to_evaluate[5][0] == move_tracker) && (state_to_evaluate[4][0] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 0) && (Mod_Potential_MoveY4[i] == 3) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }

          if ((state_to_evaluate[7][7] == move_tracker) && (state_to_evaluate[6][7] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 5) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][7] == move_tracker) && (state_to_evaluate[6][7] == move_tracker) && (state_to_evaluate[5][7] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 4) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][7] == move_tracker) && (state_to_evaluate[6][7] == move_tracker) && (state_to_evaluate[5][7] == move_tracker) && (state_to_evaluate[4][7] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 7) && (Mod_Potential_MoveY4[i] == 3) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }

          if ((state_to_evaluate[7][7] == move_tracker) && (state_to_evaluate[7][6] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 5) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][7] == move_tracker) && (state_to_evaluate[7][6] == move_tracker) && (state_to_evaluate[7][5] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 4) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }
          if ((state_to_evaluate[7][7] == move_tracker) && (state_to_evaluate[7][6] == move_tracker) && (state_to_evaluate[7][5] == move_tracker) && (state_to_evaluate[7][4] == move_tracker) ) {
              if ((Mod_Potential_MoveX4[i] == 3) && (Mod_Potential_MoveY4[i] == 7) ){
                  moveX = Mod_Potential_MoveX4[i]
                  moveY = Mod_Potential_MoveY4[i]
              }
          }

      }
  }

  //console.log(moveX)
  //console.log(moveY)
  return [moveX, moveY]
}
