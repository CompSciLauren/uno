/**
 * card constructor
 * @param {*} color
 * @param {*} value
 */
function Card(color, value) {
  this.color = color;
  this.value = value;
  this.getColorValue = function () {
    switch (this.color) {
      case "Red":
        return "#A60000";
      case "Blue":
        return "#0000FF";
      case "Green":
        return "#004f19";
      case "Yellow":
        return "#e5bf00";
      default:
        return "#333333";
    }
  };
}

/**
 * Testing function, plays a card
 */
function useCard(cardIndex) {
  //Play card
  players[gameTurn].playerDeck.playCard(cardIndex);
}

/**
 * Function draws a specific card for cheat
 */
function drawSpecificCard(cardColor, cardValue) {
  players[gameTurn].playerDeck.drawSpecificCard(cardColor, cardValue);
}

/**
 * Function draws a specific card for cheat code
 */
function removeManyCards(numberOfCards) {
  if (numberOfCards > players[gameTurn].playerDeck.amtCards - 2) {
    return;
  }

  for (let i = 0; i < numberOfCards; i++) {
    players[gameTurn].playerDeck.removeCard(0);
  }
  players[gameTurn].playerDeck.reloadHand();
}

/**
 * Function draws cards and adds them to playerhand
 */
function drawACard() {
  if (drawStack.stackAmt != 0) {
    let drawTimes = drawStack.cardType * drawStack.stackAmt;
    drawStack.clearVisual();
    for (let i = 0; i < drawTimes; i++) {
      players[gameTurn].playerDeck.drawCard();
    }

    drawStack.stackAmt = 0;
    rotatePlayers();
    play();
  } else if (forcePlay()) {
    let audio = new Audio("error.mp3");

    audio.play();
  } else {
    players[gameTurn].playerDeck.drawCard();
  }
}

$(drawCardPile).click(function () {
  drawACard();
});

/**
 * Function draws a specific number of cards and adds them to playerhand for console cheat
 */
function drawManyCard(numCards) {
  let drawTimes = numCards;
  for (let i = 0; i < drawTimes; i++) {
    players[gameTurn].playerDeck.drawCard();
  }
}

/**
 * Changes the global card object to random color/value assignment
 */
function selectPlayfieldCard() {
  let colorArray = ["Red", "Green", "Blue", "Yellow"];
  let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  let randValue = Math.floor(Math.random() * 10);
  let tempCard = new Card(randColor, randValue);

  discard(tempCard);
}

function discard(card) {
  discardPile.addCard(card);
  if (discardPile.cards.length > 5) discardPile.removeCard(0);
}

function forcePlay() {
  for (let i = 0; i < players[gameTurn].playerDeck.cards.length; i++) {
    if (players[gameTurn].playerDeck.isValid(i)) return true;
  }
  return false;
}

function addCSSDesignToBackOfCard(cardDiv, cardSpanInner) {
  cardDiv.classList.add("black");
  cardSpanInner.append("_");
  $(cardSpanInner).css("color", "#c72a18");
  $(cardSpanInner).css("background-color", "#c72a18");
  $(cardSpanInner).css("text-shadow", "#c72a18 1px 1px 1px");
}

function addCSSDesignToCard(cardDiv, cardSpanInner, cardValue, cardColor) {
  switch (cardValue) {
    case 0:
      cardDiv.classList.add("num-0");
      cardSpanInner.append("0");
      break;
    case 1:
      cardDiv.classList.add("num-1");
      cardSpanInner.append("1");
      break;
    case 2:
      cardDiv.classList.add("num-2");
      cardSpanInner.append("2");
      break;
    case 3:
      cardDiv.classList.add("num-3");
      cardSpanInner.append("3");
      break;
    case 4:
      cardDiv.classList.add("num-4");
      cardSpanInner.append("4");
      break;
    case 5:
      cardDiv.classList.add("num-5");
      cardSpanInner.append("5");
      break;
    case 6:
      cardDiv.classList.add("num-6");
      cardSpanInner.append("6");
      break;
    case 7:
      cardDiv.classList.add("num-7");
      cardSpanInner.append("7");
      break;
    case 8:
      cardDiv.classList.add("num-8");
      cardSpanInner.append("8");
      break;
    case 9:
      cardDiv.classList.add("num-9");
      cardSpanInner.append("9");
      break;
    case 10:
      // draw 2
      cardDiv.classList.add("draw2");
      cardSpanInner.append("_");
      $(cardSpanInner).css("color", "white");
      $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

      // first inner card drawing
      let specialClassDiv = document.createElement("div");
      cardSpanInner.append(specialClassDiv);
      specialClassDiv.classList.add("cardsInInnerPlus2");
      specialClassDiv.classList.add("card-plus2-bottom-left");

      let evenInnerSpan = document.createElement("span");
      specialClassDiv.append(evenInnerSpan);
      evenInnerSpan.classList.add("inner");

      // second inner card drawing
      let specialClassDiv2 = document.createElement("div");
      cardSpanInner.append(specialClassDiv2);
      specialClassDiv2.classList.add("cardsInInnerPlus2");
      specialClassDiv2.classList.add("card-plus2-top-right");

      let evenInnerSpan2 = document.createElement("span");
      specialClassDiv2.append(evenInnerSpan2);
      evenInnerSpan2.classList.add("inner");

      break;
    case 11:
      cardDiv.classList.add("reverse");
      cardSpanInner.append("⇄");
      break;
    case 12:
      cardDiv.classList.add("skip");
      cardSpanInner.append("⊘");
      break;
    case 13:
      // wild card
      cardDiv.classList.add("wild");
      cardDiv.classList.add("black");
      cardSpanInner.append("_");
      $(cardSpanInner).css("color", "white");
      $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

      // div circle container
      let specialClassDiv9 = document.createElement("div");
      cardSpanInner.append(specialClassDiv9);
      specialClassDiv9.classList.add("circle-container");

      // stuff in container
      let yinnerSpecialClassDiv1 = document.createElement("div");
      specialClassDiv9.append(yinnerSpecialClassDiv1);
      yinnerSpecialClassDiv1.classList.add("quarter");
      yinnerSpecialClassDiv1.classList.add("top-left");

      let yinnerSpecialClassDiv2 = document.createElement("div");
      specialClassDiv9.append(yinnerSpecialClassDiv2);
      yinnerSpecialClassDiv2.classList.add("quarter");
      yinnerSpecialClassDiv2.classList.add("top-right");

      let yinnerSpecialClassDiv3 = document.createElement("div");
      specialClassDiv9.append(yinnerSpecialClassDiv3);
      yinnerSpecialClassDiv3.classList.add("quarter");
      yinnerSpecialClassDiv3.classList.add("bottom-left");

      let yinnerSpecialClassDiv4 = document.createElement("div");
      specialClassDiv9.append(yinnerSpecialClassDiv4);
      yinnerSpecialClassDiv4.classList.add("quarter");
      yinnerSpecialClassDiv4.classList.add("bottom-right");

      // span inner
      let zabevenInnerSpan = document.createElement("span");
      specialClassDiv9.append(zabevenInnerSpan);
      zabevenInnerSpan.classList.add("inner");
      break;
    case 14:
      // wild +4 card
      cardDiv.classList.add("plus-4");
      cardDiv.classList.add("black");
      cardSpanInner.append("_");
      $(cardSpanInner).css("color", "white");
      $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

      // div card green
      let specialClassDiv19 = document.createElement("div");
      cardSpanInner.append(specialClassDiv19);
      specialClassDiv19.classList.add("cardsInInnerPlus4");
      specialClassDiv19.classList.add("card-plus4-green");
      specialClassDiv19.classList.add("green");

      let evenInnerSpan1 = document.createElement("span");
      specialClassDiv19.append(evenInnerSpan1);
      evenInnerSpan1.classList.add("inner");

      // div card blue
      let specialClassDiv192 = document.createElement("div");
      cardSpanInner.append(specialClassDiv192);
      specialClassDiv192.classList.add("cardsInInnerPlus4");
      specialClassDiv192.classList.add("card-plus4-blue");
      specialClassDiv192.classList.add("blue");

      let evenInnerSpan12 = document.createElement("span");
      specialClassDiv192.append(evenInnerSpan12);
      evenInnerSpan12.classList.add("inner");

      // div card red
      let specialClassDiv193 = document.createElement("div");
      cardSpanInner.append(specialClassDiv193);
      specialClassDiv193.classList.add("cardsInInnerPlus4");
      specialClassDiv193.classList.add("card-plus4-red");
      specialClassDiv193.classList.add("red");

      let evenInnerSpan13 = document.createElement("span");
      specialClassDiv193.append(evenInnerSpan13);
      evenInnerSpan13.classList.add("inner");

      // div card yellow
      let specialClassDiv194 = document.createElement("div");
      cardSpanInner.append(specialClassDiv194);
      specialClassDiv194.classList.add("cardsInInnerPlus4");
      specialClassDiv194.classList.add("card-plus4-yellow");
      specialClassDiv194.classList.add("yellow");

      let evenInnerSpan14 = document.createElement("span");
      specialClassDiv194.append(evenInnerSpan14);
      evenInnerSpan14.classList.add("inner");
      break;
  }
}

function drawCardAnimation(thisHandId, randValue, randColor, thisObject) {
  // obtain drawPile div
  let drawPile = document.getElementById("drawCardPile");

  // create containers for the cards and add class
  let drawCardContainer = document.createElement("div");
  let drawCardContainerBack = document.createElement("div");
  drawCardContainer.classList.add("drawCardContainer");
  drawCardContainerBack.classList.add("drawCardContainer");

  // append containers to drawpile div
  drawPile.append(drawCardContainer);
  drawPile.append(drawCardContainerBack);

  // create card visuals
  let cardDivBack = document.createElement("div");
  let cardDiv = document.createElement("div");

  // append cards into containers
  drawCardContainer.append(cardDiv);
  drawCardContainerBack.append(cardDivBack);

  //add class card to card divs
  cardDiv.classList.add("card");
  cardDivBack.classList.add("card");

  // create the inside of the cards
  let cardSpan = document.createElement("span");
  cardDiv.append(cardSpan);
  cardSpan.classList.add("inner");

  let cardSpanInner = document.createElement("span");
  cardSpan.append(cardSpanInner);
  cardSpanInner.classList.add("mark");

  let cardSpanBack = document.createElement("span");
  cardDivBack.append(cardSpanBack);
  cardSpanBack.classList.add("inner");

  let cardSpanInnerBack = document.createElement("span");
  cardSpanBack.append(cardSpanInnerBack);
  cardSpanInnerBack.classList.add("mark");

  cardDiv.append();
  cardDivBack.append();

  addCSSDesignToBackOfCard(cardDivBack, cardSpanInnerBack);

  if (thisHandId == "BottomSeat") {
    addCSSDesignToCard(cardDiv, cardSpanInner, randValue, randColor);

    // determines color of card drawn from the playfield deck
    switch (randColor) {
      case "Blue":
        cardDiv.classList.add("blue");
        break;
      case "Red":
        cardDiv.classList.add("red");
        break;
      case "Green":
        cardDiv.classList.add("green");
        break;
      case "Yellow":
        cardDiv.classList.add("yellow");
        break;
    }

    drawCardContainer.classList.add("drawCardAnimationFrontDown");
    drawCardContainerBack.classList.add("drawCardAnimationBack");
  } else {
    addCSSDesignToBackOfCard(cardDiv, cardSpanInner);

    if (thisHandId == "TopSeat") {
      drawCardContainer.classList.add("drawCardAnimationHiddenUp");
    } else if (thisHandId == "RightSeat") {
      drawCardContainer.classList.add("drawCardAnimationHiddenRight");
    } else if (thisHandId == "LeftSeat") {
      drawCardContainer.classList.add("drawCardAnimationHiddenLeft");
    } else {
      drawCardContainer.classList.add("drawCardAnimationFront");
    }
    drawCardContainerBack.classList.add("drawCardBackHidden");
  }

  setTimeout(function () {
    drawPile.removeChild(drawPile.childNodes[0]);
    drawPile.removeChild(drawPile.childNodes[0]);
    thisObject.reloadHand();
  }, 1000);
}