/**
 * card constructor
 * @param {*} color
 * @param {*} value
 */
function card(color, value) {
  this.color = color;
  this.value = value;
  this.getColorValue = function () {
    if (this.color == "Red") {
      return "#A60000";
    } else if (this.color == "Blue") {
      return "#0000FF";
    } else if (this.color == "Green") {
      return "#004f19";
    } else if (this.color == "Yellow") {
      return "#e5bf00";
    } else {
      return "#333333";
    }
  };
}

/**
 * deck constructor
 * @param {*} divId
 * @param {*} hidden
 */
function deck(divId, hidden) {
  this.cards = [];
  this.amtCards = 0;
  this.hand = document.getElementById(divId);
  this.isHidden = hidden;

  /**
   * Adds a card to the cards array
   */
  this.addCard = function (c) {
    this.cards.push(c);
    this.amtCards = this.cards.length;
  };

  /**
   * removes a card from card array
   */
  this.removeCard = function (c) {
    this.cards.splice(c, 1);
    this.amtCards = this.cards.length;
  };

  /**
   * Gives player a random card
   */
  this.drawCard = function () {
    let colorArray = ["Red", "Green", "Blue", "Yellow", "Special"];
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    let randValue = Math.floor(Math.random() * 13);
    if (randColor == "Special") {
      //Pick random number between 1 and 3, if 1 or 2 make Wildcard, else regular card
      let randNum = Math.round((Math.random() * 2) + 1);
      //console.log("Rand num: " + randNum);
      if (randNum == 1 || randNum == 2) {
        randValue = randValue % 2;
      }
      else {
        //array of colors minus "Special" option
        randColor = colorArray[Math.floor(Math.random() * (colorArray.length - 1))];
        randValue = Math.floor(Math.random() * 13);
      }
    }
    let tempCard = new card(randColor, randValue);
    this.addCard(tempCard);

    //Draw Card Animation Start
    if (!initialDraw) {
      let drawPile = document.getElementById("drawCardPile");

      let cardDiv = document.createElement("div");
      let cardDivBack = document.createElement("div");

      drawPile.append(cardDiv);
      drawPile.append(cardDivBack);

      cardDiv.classList.add("card");
      cardDivBack.classList.add("card");

      cardDiv.style.backgroundColor = "#000";
      cardDivBack.style.backgroundColor = "#000";
      if (this.hand.id == "BottomSeat") {
        cardDiv.innerHTML = tempCard.value;
        cardDiv.style.backgroundColor = tempCard.getColorValue();
        cardDiv.classList.add("drawCardAnimationFrontDown");
        cardDivBack.classList.add("drawCardAnimationBack");
      } else {
        if (this.hand.id == "TopSeat") {
          cardDiv.classList.add("drawCardAnimationHiddenUp");
        } else if (this.hand.id == "RightSeat") {
          cardDiv.classList.add("drawCardAnimationHiddenRight");
        } else if (this.hand.id == "LeftSeat") {
          cardDiv.classList.add("drawCardAnimationHiddenLeft");
        } else {
          cardDiv.classList.add("drawCardAnimationFront");
        }
        cardDivBack.classList.add("drawCardBackHidden");
      }


      let thisObject = this;
      setTimeout(function () {
        drawPile.removeChild(drawPile.childNodes[0]);
        drawPile.removeChild(drawPile.childNodes[0]);
        thisObject.reloadHand();
      }, 1000);
    } else {
      this.reloadHand();
    }

    //Draw Card Animation End

    console.log(
      players[gameTurn].playerID + " Drew a " + randColor + " " + randValue
    ); //testing

    //If drawing a card, player CANNOT have Uno
    players[gameTurn].unoCall = false;
  };

  /**
   * removes card from hand and reloads hand (post-validation of good move)
   */
  this.playCard = function (c) {
    if (this.isValid(c)) {
      //Check if second to last card & Uno call protection
      if (players[gameTurn].playerDeck.amtCards == 2 && players[gameTurn].unoCall != true) {
        console.log("Player failed to call Uno before playing second to last card. Penalty 2 cards");
        players[gameTurn].playerDeck.drawCard();
        players[gameTurn].playerDeck.drawCard();
      }
      else {
        //console.log("Player called Uno");
      }
      //console.log(this.getCard(c).color + " " + this.getCard(c).value);

      let cardBeingPlayed = this.cards[c];

      //Set playfield card to validated 'played' card
      //playFieldCard.color = cardBeingPlayed.color;
      //playFieldCard.value = cardBeingPlayed.value;
      discard(cardBeingPlayed);

      refreshPlayfieldCardVisual();

      if (cardBeingPlayed.color == "Special") {
        if (cardBeingPlayed.value == 0) {
          cardWild();
        } else if (cardBeingPlayed.value == 1) {
          cardDraw4();
        }
      } else if (cardBeingPlayed.value == 10) {
        cardDraw2();
      } else if (cardBeingPlayed.value == 11) {
        cardReverse();
      } else if (cardBeingPlayed.value == 12) {
        cardSkip();
      }

      //Remove played card from hand
      this.removeCard(c);
      if (this.cards.length == 0) {
        alert("You win!");
        location.reload();
        return;
      }
    } else {
      this.cardInvalid();
      return false;
    }

    this.reloadHand();
    rotatePlayers();
    play();
    return true;
  };

  /**
   * Returns card at index c
   */
  this.getCard = function (c) {
    return this.cards[c];
  };

  /**
   * Reloads the player hand to have the most recent cards in player hand
   */
  this.reloadHand = function () {
    this.hand.innerHTML = "";
    let i = 0;
    for (i = 0; i < this.amtCards; i++) {
      let cardDiv = document.createElement("div");
      this.hand.append(cardDiv);
      cardDiv.classList.add("card");

      let cardSpan = document.createElement("span");
      cardDiv.append(cardSpan);
      cardSpan.classList.add("inner");

      let cardSpanInner = document.createElement("span");
      cardSpan.append(cardSpanInner);
      cardSpanInner.classList.add("mark");

      cardDiv.append();

      if (!this.isHidden) {
        switch (this.getCard(i).value) {
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
            // Draw 2
            cardDiv.classList.add("draw2");
            cardSpanInner.append("_"); // how to insert space here?

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
            // Reverse
            cardDiv.classList.add("reverse");
            cardSpanInner.append("_"); // how to insert space here?

            // left arrow drawing
            let aspecialClassDiv = document.createElement("div");
            cardSpanInner.append(aspecialClassDiv);
            aspecialClassDiv.classList.add("left-arrow-container");
            let ainnerSpecialClassDiv = document.createElement("div");
            aspecialClassDiv.append(ainnerSpecialClassDiv);
            ainnerSpecialClassDiv.classList.add("arrow-body");

            let aevenInnerSpan = document.createElement("span");
            ainnerSpecialClassDiv.append(aevenInnerSpan);
            aevenInnerSpan.classList.add("arrow-head");

            // right arrow drawing
            let bspecialClassDiv = document.createElement("div");
            cardSpanInner.append(bspecialClassDiv);
            bspecialClassDiv.classList.add("right-arrow-container");
            let binnerSpecialClassDiv = document.createElement("div");
            bspecialClassDiv.append(binnerSpecialClassDiv);
            binnerSpecialClassDiv.classList.add("arrow-body2");

            let bevenInnerSpan = document.createElement("span");
            binnerSpecialClassDiv.append(bevenInnerSpan);
            bevenInnerSpan.classList.add("arrow-head");

            break;
          case 12:
            // Skip
            cardDiv.classList.add("skip");
            cardSpanInner.append("_"); // how to insert space here?

            // first inner card drawing
            let zspecialClassDiv = document.createElement("div");
            cardSpanInner.append(zspecialClassDiv);
            zspecialClassDiv.classList.add("cardsInInnerSkip");
            zspecialClassDiv.classList.add("no-symbol");

            let zevenInnerSpan = document.createElement("span");
            zspecialClassDiv.append(zevenInnerSpan);
            zevenInnerSpan.classList.add("inner");

            break;
        }

        cardDiv.classList.add("my-card");
        if (this.getCard(i).getColorValue() == "#0000FF") {
          cardDiv.classList.add("blue");
        }
        if (this.getCard(i).getColorValue() == "#A60000") {
          cardDiv.classList.add("red");
        }
        if (this.getCard(i).getColorValue() == "#004f19") {
          cardDiv.classList.add("green");
        }
        if (this.getCard(i).getColorValue() == "#e5bf00") {
          cardDiv.classList.add("yellow");
        }
      } else {
        cardDiv.style.backgroundColor = "#000000";
      }
    }
  };

  //Compare selected card to playfield card
  this.isValid = function (c) {
    //Get in the value by element ID
    let cardColor = this.cards[c].color;
    let cardNumber = this.cards[c].value;

    //Will run if there is a stackable card played, +2 or +4
    if (drawStack.stackAmt != 0) {
      if (cardNumber != drawStack.cardValue) {
        return false;
      } else if (cardNumber == 1 && cardColor != "Special") {
        return false;
      } else {
        return true;
      }
    }

    if (cardColor == discardPile.cards[discardPile.cards.length - 1].color || cardColor == "Special") {
      return true;
    }
    if (cardNumber == discardPile.cards[discardPile.cards.length - 1].value) {
      return true;
    }
    console.log("Played card: " + cardColor + " " + cardNumber);
    console.log("Playfield card card: " + discardPile.cards[discardPile.cards.length - 1].color + " " + discardPile.cards[discardPile.cards.length - 1].value);

    return false;
  }; //end of check card to playfield

  this.cardInvalid = function () {
    let audio = new Audio("error.mp3");
    audio.play();
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
 * Function draws cards and adds them to playerhand
 */
function drawACard() {
  if (drawStack.stackAmt != 0) {
    let drawTimes = drawStack.cardType * drawStack.stackAmt;
    let i = 0;
    for (i = 0; i < drawTimes; i++) {
      players[gameTurn].playerDeck.drawCard();
    }

    drawStack.stackAmt = 0;
    rotatePlayers();
    play();
  }
  else if (forcePlay()) {
    let audio = new Audio("error.mp3");
    audio.play();
  }
  else {
    players[gameTurn].playerDeck.drawCard();
  }
}

/**
 * Changes the global card object to random color/value assignment
 */
function SelectPlayfieldCard() {
  let colorArray = ["Red", "Green", "Blue", "Yellow"];
  let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  let randValue = Math.floor(Math.random() * 10);
  let tempCard = new card(randColor, randValue);

  discard(tempCard);
}

function discard(card) {
  discardPile.addCard(card);
  if (discardPile.cards.length > 5)
    discardPile.removeCard(0);
}

function forcePlay() {
  for (let i = 0; i < players[gameTurn].playerDeck.cards.length; i++) {
    if (players[gameTurn].playerDeck.isValid(i))
      return true;
  }
  return false;
}
