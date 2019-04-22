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
      //Pick random number between 1 and 2, if 1 make Wildcard, else regular card
      let randNum = Math.round((Math.random()*1)+1);
      console.log("Rand num: " + randNum);
      if (randNum == 1)
      {
        randValue = randValue % 2;
      }
      else
      {
        //array of colors minus "Special" option
        randColor = colorArray[Math.floor(Math.random() * (colorArray.length-1))];
        randValue = Math.floor(Math.random() * 13);
      }
    }
    let tempCard = new card(randColor, randValue);
    this.addCard(tempCard);
    this.reloadHand();
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
      if (players[gameTurn].playerDeck.amtCards == 2 && players[gameTurn].unoCall != true)
      {
        console.log("Player failed to call Uno before playing second to last card. Penalty 2 cards");
        players[gameTurn].playerDeck.drawCard();
        players[gameTurn].playerDeck.drawCard();
      }
      else
      {
        console.log("Player called Uno");
      }
      console.log(this.getCard(c).color + " " + this.getCard(c).value);

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
      if (!this.isHidden) {
        cardDiv.innerHTML = this.getCard(i).value;
        cardDiv.style.backgroundColor = this.getCard(i).getColorValue();
        cardDiv.classList.add('my-card');
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
  } else {
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

function discard(card){
  discardPile.addCard(card);
  if (discardPile.cards.length > 5)
    discardPile.removeCard(0);
}
