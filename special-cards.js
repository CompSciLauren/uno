/**
 * Reverse the direction of player rotation
 */
function cardReverse() {
  if (players.length == 2) {
    rotatePlayers();
  } else {
    gameDirection = -1 * gameDirection;
  }
}

/**
 * Skip the next player in rotation
 */
function cardSkip() {
  rotatePlayers();
}

function cardWild() {
  if (players[gameTurn].isBot) {
    let colorArray = ["Red", "Green", "Blue", "Yellow"];
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    discardPile.cards[discardPile.cards.length - 1].color = randColor;
    let colorChoice = "";
    switch (randColor) {
      case "Red":
        colorChoice = "#c72a18";
        break;
      case "Green":
        colorChoice = "#18a849";
        break;
      case "Blue":
        colorChoice = "#0063b3";
        break;
      case "Yellow":
        colorChoice = "#e6ca1e";
        break;
    }
    $(".chosen-wild-card-color .inner").css("background", colorChoice);
  } else {
    let wildUI = document.createElement("div");
    document.getElementById("wildColor").append(wildUI);
    wildUI.classList.add("wildStyle");
    on();
  }
  return true;
}

function cardDraw2() {
  drawStack.stackAmt++;
  drawStack.cardType = 2;
  drawStack.cardValue = 10;
  drawStack.updateStack();
}

function cardDraw4() {
  drawStack.stackAmt++;
  drawStack.cardType = 4;
  drawStack.cardValue = 1;
  drawStack.updateStack();
  cardWild();
}
