/* Special Card Implementations */

/**
 * Reverses the direction of player rotation
 */
function cardReverse() {
  console.log("Reverse Card!");
  if (players.length == 2) {
    rotatePlayers();
  } else {
    gameDirection = -1 * gameDirection;
  }
}

/**
 * Skips the next player in rotation
 */
function cardSkip() {
  console.log("Skip Card!");
  rotatePlayers();
}

/**
 * Card is wild
 */
function cardWild() {
  console.log("Wild Card!");
  if (players[gameTurn].isBot) {
    let colorArray = ["Red", "Green", "Blue", "Yellow"];
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];

    playFieldCard.color = randColor;
    playFieldCard.value = -1;

    refreshPlayfieldCardVisual();
  } else {
    let isColorSelected = false;
    let wildUI = document.createElement("div");
    document.getElementById("wildColor").append(wildUI);
    wildUI.classList.add("wildStyle");
    //Runs html allowing user to choose one of 4 correct colors  --  TRAVIS
    wildUI.innerHTML =
      "<form name='colorPick' id='myForm'> Enter the Color you want to switch to<br> <input type='radio' name='color' value='Red'>Red<br><input type='radio' name='color' value='Yellow'>Yellow<br><input type='radio' name='color' value='Blue'>Blue<br><input type='radio' name='color' value='Green'>Green<br><input type='button' id='colorButton' value='Pick'></form>";
    document.getElementById("colorButton").onclick = function() {
      playFieldCard.color = document.querySelector(
        'input[name="color"]:checked'
      ).value;
      playFieldCard.value = -1;
      document.getElementById("wildColor").innerHTML = "";
      refreshPlayfieldCardVisual();
      console.log(playFieldCard.color);
      isColorSelected = true;
      rotatePlayers();
      play();
    };
    gameTurn = gameTurn - gameDirection;
  }
  return true;
} //end of cardWild

/**
 * Draws 2 cards
 */
function cardDraw2() {
  console.log("Draw 2 Card!");
  drawStack.stackAmt++;
  drawStack.cardType = 2;
  drawStack.cardValue = 10;
}

/**
 * Draws 4 cards
 */
function cardDraw4() {
  console.log("Draw 4 Card!");
  drawStack.stackAmt++;
  drawStack.cardType = 4;
  drawStack.cardValue = 1;
  cardWild();
}
