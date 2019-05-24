/**
 * card constructor
 * @param {*} color
 * @param {*} value
 */
function card(color, value) {
  this.color = color;
  this.value = value;
  this.getColorValue = function() {
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
  this.addCard = function(c) {
    this.cards.push(c);
    this.amtCards = this.cards.length;
  };

  /**
   * removes a card from card array
   */
  this.removeCard = function(c) {
    this.cards.splice(c, 1);
    this.amtCards = this.cards.length;
  };

  /**
   * Gives player a specific card for cheat code
   */
  this.drawSpecificCard = function(cardColor, cardValue) {
    let tempCardColor = cardColor;
    let tempCardValue = cardValue;

    let tempCard = new card(tempCardColor, tempCardValue);
    this.addCard(tempCard);
    this.reloadHand();
  };

  /**
   * Gives player a random card
   */
  this.drawCard = function() {
    let colorArray = ["Red", "Green", "Blue", "Yellow", "Special"];
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    let randValue = Math.floor(Math.random() * 13);
    if (randColor == "Special") {
      //Pick random number between 1 and 3, if 1 or 2 make Wildcard, else regular card
      let randNum = Math.round(Math.random() * 2 + 1);
      //console.log("Rand num: " + randNum);
      if (randNum == 1 || randNum == 2) {
        randValue = randValue % 2;
      } else {
        //array of colors minus "Special" option
        randColor =
          colorArray[Math.floor(Math.random() * (colorArray.length - 1))];
        randValue = Math.floor(Math.random() * 13);
      }
    }
    let tempCard = new card(randColor, randValue);
    this.addCard(tempCard);

    //Draw Card Animation Start
    if (!initialDraw) {
      //obtains drawPile div
      let drawPile = document.getElementById("drawCardPile");

      //create Containers for the cards and adds class
      let drawCardContainer = document.createElement("div");
      let drawCardContainerBack = document.createElement("div");
      drawCardContainer.classList.add("drawCardContainer");
      drawCardContainerBack.classList.add("drawCardContainer");

      //append containers to drawpile div
      drawPile.append(drawCardContainer);
      drawPile.append(drawCardContainerBack);

      //create Card Visuals
      let cardDivBack = document.createElement("div");
      let cardDiv = document.createElement("div");

      //apend cards into containers
      drawCardContainer.append(cardDiv);
      drawCardContainerBack.append(cardDivBack);

      //add class card to card divs
      cardDiv.classList.add("card");
      cardDivBack.classList.add("card");

      //creates the inside of the cards
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

      cardDivBack.classList.add("black");
      cardSpanInnerBack.append("_");
      $(cardSpanInnerBack).css("color", "#c72a18");
      $(cardSpanInnerBack).css("background-color", "#c72a18");
      $(cardSpanInnerBack).css("text-shadow", "#c72a18 1px 1px 1px");

      if (this.hand.id == "BottomSeat") {
        switch (randValue) {
          case 0:
            if (randColor != "Special") {
              // regular 0 card
              cardDiv.classList.add("num-0");
              cardSpanInner.append("0");
            } else {
              // Wild card
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
            }
            break;
          case 1:
            if (randColor != "Special") {
              // regular 1 card
              cardDiv.classList.add("num-1");
              cardSpanInner.append("1");
            } else {
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
            }
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
            // Reverse
            cardDiv.classList.add("reverse");
            cardSpanInner.append("_");
            $(cardSpanInner).css("color", "white");
            $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

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
            cardSpanInner.append("_");
            $(cardSpanInner).css("color", "white");
            $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

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

        if (randColor == "Blue") {
          cardDiv.classList.add("blue");
        }
        if (randColor == "Red") {
          cardDiv.classList.add("red");
        }
        if (randColor == "Green") {
          cardDiv.classList.add("green");
        }
        if (randColor == "Yellow") {
          cardDiv.classList.add("yellow");
        }

        drawCardContainer.classList.add("drawCardAnimationFrontDown");
        drawCardContainerBack.classList.add("drawCardAnimationBack");
      } else {
        cardDiv.classList.add("black");
        cardSpanInner.append("_");
        $(cardSpanInner).css("color", "#c72a18");
        $(cardSpanInner).css("background-color", "#c72a18");
        $(cardSpanInner).css("text-shadow", "#c72a18 1px 1px 1px");

        if (this.hand.id == "TopSeat") {
          drawCardContainer.classList.add("drawCardAnimationHiddenUp");
        } else if (this.hand.id == "RightSeat") {
          drawCardContainer.classList.add("drawCardAnimationHiddenRight");
        } else if (this.hand.id == "LeftSeat") {
          drawCardContainer.classList.add("drawCardAnimationHiddenLeft");
        } else {
          drawCardContainer.classList.add("drawCardAnimationFront");
        }
        drawCardContainerBack.classList.add("drawCardBackHidden");
      }

      let thisObject = this;
      setTimeout(function() {
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
  this.playCard = function(c) {
    if (this.isValid(c)) {
      //Check if second to last card & Uno call protection
      if (
        players[gameTurn].playerDeck.amtCards == 2 &&
        players[gameTurn].unoCall != true
      ) {
        console.log(
          "Player failed to call Uno before playing second to last card. Penalty 2 cards"
        );
        document.getElementById("unoButton").classList.add("unoButton");
        setTimeout(function() {
          document.getElementById("unoButton").classList.remove("unoButton");
        }, 500);
        players[gameTurn].playerDeck.drawCard();
        players[gameTurn].playerDeck.drawCard();
      }

      let cardBeingPlayed = this.cards[c];

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
        alert(players[gameTurn].playerID + " wins!");
        location.reload();
        return;
      }
    } else if (!players[gameTurn].isBot) {
      this.cardInvalid(c);
      return false;
    } else {
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
  this.getCard = function(c) {
    return this.cards[c];
  };

  /**
   * Reloads the player hand to have the most recent cards in player hand
   */
  this.reloadHand = function() {
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
            if (this.getCard(i).color != "Special") {
              // regular 0 card
              cardDiv.classList.add("num-0");
              cardSpanInner.append("0");
            } else {
              // Wild card
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
            }
            break;
          case 1:
            if (this.getCard(i).color != "Special") {
              // regular 1 card
              cardDiv.classList.add("num-1");
              cardSpanInner.append("1");
            } else {
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
            }
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
            // Reverse
            cardDiv.classList.add("reverse");
            cardSpanInner.append("_");
            $(cardSpanInner).css("color", "white");
            $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

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
            cardSpanInner.append("_");
            $(cardSpanInner).css("color", "white");
            $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

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

        //prevents the discardDeckDiv from being counted as playable cards
        if (this.hand.id != "discardDeckDiv") {
          cardDiv.classList.add("my-card");
        }

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
        cardDiv.classList.add("black");
        cardSpanInner.append("_");
        $(cardSpanInner).css("color", "#c72a18");
        $(cardSpanInner).css("background-color", "#c72a18");
        $(cardSpanInner).css("text-shadow", "#c72a18 1px 1px 1px");
        if (i >= 7) {
          cardDiv.style.display = "none";
        }
      }
    }
  };

  //Compare selected card to playfield card
  this.isValid = function(c) {
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

    if (
      cardColor == discardPile.cards[discardPile.cards.length - 1].color ||
      cardColor == "Special"
    ) {
      return true;
    }
    if (cardNumber == discardPile.cards[discardPile.cards.length - 1].value) {
      return true;
    }
    console.log("Played card: " + cardColor + " " + cardNumber);
    console.log(
      "Playfield card card: " +
        discardPile.cards[discardPile.cards.length - 1].color +
        " " +
        discardPile.cards[discardPile.cards.length - 1].value
    );

    return false;
  };

  this.cardInvalid = function(c) {
    let audio = new Audio("error.mp3");
    if (players[gameTurn].isBot == false) audio.play();
    players[gameTurn].playerDeck.hand.childNodes[c].classList.add("invalid");
    setTimeout(function() {
      players[gameTurn].playerDeck.hand.childNodes[c].classList.remove(
        "invalid"
      );
    }, 500);
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
    console.log("Error: Cannot leave less than 2 cards in the players hand");
    return;
  }
  let i = 0;
  for (i = 0; i < numberOfCards; i++) {
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
    let i = 0;
    drawStack.clearVisual();
    for (i = 0; i < drawTimes; i++) {
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

$(drawCardPile).click(function() {
  drawACard();
});

/**
 * Function draws a specific number of cards and adds them to playerhand for console cheat
 */
function drawManyCard(numCards) {
  let drawTimes = numCards;
  let i = 0;
  for (i = 0; i < drawTimes; i++) {
    players[gameTurn].playerDeck.drawCard();
  }
}

/**
 * Function draws a specific number of cards and adds them to playerhand for console cheat
 */
function drawManyCard(numCards) {
  let drawTimes = numCards;
  let i = 0;
  for (i = 0; i < drawTimes; i++) {
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
  if (discardPile.cards.length > 5) discardPile.removeCard(0);
}

function forcePlay() {
  for (let i = 0; i < players[gameTurn].playerDeck.cards.length; i++) {
    if (players[gameTurn].playerDeck.isValid(i)) return true;
  }
  return false;
}
