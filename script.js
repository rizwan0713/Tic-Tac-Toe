
 const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");
//Current player
 let currentPlayer;
 let gameGrid;
// all posible combination of winning
 const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
 ];

 //Start the Game
 function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","",]; // this is for inner grid logic not UI
    //WE have to change on UI Also
    boxes.forEach((box,index) => {
      box.innerText = "";
      boxes[index].style.pointerEvents ="all"; 
      //initialize boxes with css properties again
      box.classList= `box box${index+1}`;


    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
 }

initGame();

//Swap Function for Changing Player
function swapTurn(){
   if(currentPlayer === "X"){
      currentPlayer = "O";
   }
   else{
      currentPlayer = "X";
   }
   //UI Update
   gameInfo.innerText =`Current Player - ${currentPlayer}`;
}

 function CheckGameOver(){
   let answer = "";
   winningPositions.forEach((position) => {
      // All 3 boxes should be non-Empty and exactly same in values
      if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !== "" ||gameGrid[position[2]] !=="")
      && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
   
          //Check Who is winner X or O
          if(gameGrid[position[0]] === "X")
              answer = "X";
          else
            answer = "O";

            //Disable pointer events  because when we have a winnner then no need to continue game
            boxes.forEach((box) => {
               box.style.pointerEvents = "none";
            })
         
            // Now we Know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

         }

   });
 
   //it means We have a winner
   if(answer !==""){
      gameInfo.innerText=`Winner Player - ${answer}`;
      newGameBtn.classList.add("active");
      return;
   }
  
   //When There is a tied
   let fillCount = 0;
   gameGrid.forEach((box) => {
      if(box !=="")
      fillCount++;
   })
   //boared is filled ,game is tied
   if(fillCount ===9 ){
      gameInfo.innerText = "Game Tied !";
      newGameBtn.classList.add("active");
   }

 }



//HandleClick function for checking that box is empty
function handleClick(index){
   if(gameGrid[index]===""){
      boxes[index].innerText = currentPlayer;
      gameGrid[index] = currentPlayer;
      boxes[index].style.pointerEvents = "none";
      //Swap player turn
      swapTurn();
      //Checking did anyone win
      CheckGameOver();
   }
}

// Event Listener for every box for making it non clickable after one click
boxes.forEach((box,index) => {
   box.addEventListener("click",() => {
      handleClick(index);
   })
})

newGameBtn.addEventListener("click",initGame);