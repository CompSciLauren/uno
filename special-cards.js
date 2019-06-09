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
    let colorChoice = convertColorToHex(randColor);
    $(".chosen-wild-card-color .inner").css("background", colorChoice);
  } else {
    document.getElementById("overlay").style.display = "block";
  }
  return true;
}

function selectWildColor(color) {
  discardPile.cards[
    discardPile.cards.length - 1
  ].color = color;
  $(".chosen-wild-card-color .inner").css("background", convertColorToHex(color));
  isColorSelected = true;
  rotatePlayers();
  play();
  document.getElementById("overlay").style.display = "none";
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

function convertColorToHex(color) {
  switch (color) {
    case "Red":
      return "#c72a18";
    case "Green":
      return "#18a849";
    case "Blue":
      return "#0063b3";
    case "Yellow":
      return "#e6ca1e";
  }
}