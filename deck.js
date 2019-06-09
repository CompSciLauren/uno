/**
 * deck constructor
 * @param {*} divId
 * @param {*} hidden
 */
function Deck(divId, hidden) {
    this.cards = [];
    this.amtCards = 0;
    this.hand = document.getElementById(divId);
    this.isHidden = hidden;

    /**
     * Add a card to the cards array
     */
    this.addCard = function (card) {
        this.cards.push(card);
        this.amtCards = this.cards.length;
    };

    /**
     * Remove a card from card array
     */
    this.removeCard = function (card) {
        this.cards.splice(card, 1);
        this.amtCards = this.cards.length;
    };

    /**
     * Give player a specific card for cheat code
     */
    this.drawSpecificCard = function (cardColor, cardValue) {
        let tempCardColor = cardColor;
        let tempCardValue = cardValue;

        let tempCard = new Card(tempCardColor, tempCardValue);
        this.addCard(tempCard);
        this.reloadHand();
    };

    /**
     * Give player a random card
     */
    this.drawCard = function () {
        let colorArray = ["Red", "Green", "Blue", "Yellow", "Special"];
        let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        let randValue = Math.floor(Math.random() * 13);
        if (randColor == "Special") {
            //Pick random number between 1 and 3, if 1 or 2 make Wildcard, else regular card
            let randNum = Math.round(Math.random() * 2 + 1);
            if (randNum == 1 || randNum == 2) {
                randValue = randValue % 2;
                if (randValue == 0) {
                    randValue = 13;
                }
                else {
                    randValue = 14;
                }
            } else {
                // array of colors minus "Special" option
                randColor =
                    colorArray[Math.floor(Math.random() * (colorArray.length - 1))];
                randValue = Math.floor(Math.random() * 13);
            }
        }
        let tempCard = new Card(randColor, randValue);
        this.addCard(tempCard);

        if (!initialDraw) {
            drawCardAnimation(this.hand.id, randValue, randColor, this);
        }
        else {
            this.reloadHand();
        }

        // if drawing a card, player cannot have Uno
        players[gameTurn].unoCall = false;
    };

    /**
     * Remove card from hand and reload hand (post-validation of good move)
     */
    this.playCard = function (card) {
        let wildColorMenuIsInactive = true;
        if (this.isValid(card)) {
            // check if second to last card & Uno call protection
            if (
                players[gameTurn].playerDeck.amtCards == 2 &&
                players[gameTurn].unoCall != true
            ) {
                document.getElementById("unoButton").classList.add("unoButton");
                setTimeout(function () {
                    document.getElementById("unoButton").classList.remove("unoButton");
                }, 500);
                players[gameTurn].playerDeck.drawCard();
                players[gameTurn].playerDeck.drawCard();
            }

            let cardBeingPlayed = this.cards[card];

            discard(cardBeingPlayed);
            discardPile.reloadHand();

            switch (cardBeingPlayed.value) {
                case 10:
                    cardDraw2();
                    break;
                case 11:
                    cardReverse();
                    break;
                case 12:
                    cardSkip();
                    break;
                case 13:
                    cardWild();
                    if (!players[gameTurn].isBot) {
                        wildColorMenuIsInactive = false;
                    }
                    break;
                case 14:
                    cardDraw4();
                    if (!players[gameTurn].isBot) {
                        wildColorMenuIsInactive = false;
                    }
                    break;
            }

            // remove played card from hand
            this.removeCard(card);
            if (this.cards.length == 0) {
                alert(players[gameTurn].playerID + " wins!");
                location.reload();
                return;
            }
        } else if (!players[gameTurn].isBot) {
            this.cardInvalid(card);
            return false;
        } else {
            return false;
        }

        this.reloadHand();
        if (wildColorMenuIsInactive == true) {
            rotatePlayers();
            play();
        }
        return true;
    };

    /**
     * Return card at index card
     */
    this.getCard = function (card) {
        return this.cards[card];
    };

    /**
     * Reload the player hand to have the most recent cards in player hand
     */
    this.reloadHand = function () {
        this.hand.innerHTML = "";
        for (let i = 0; i < this.amtCards; i++) {
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
                addCSSDesignToCard(cardDiv, cardSpanInner, this.getCard(i).value);

                // prevent the discardDeckDiv from being counted as playable cards
                if (this.hand.id != "discardDeckDiv") {
                    cardDiv.classList.add("my-card");
                }
                if (this.hand.id == "discardDeckDiv") {
                    if (i == discardPile.cards.length - 1) {
                        if (cardDiv.classList.contains("wild") || cardDiv.classList.contains("plus-4")) {
                            cardDiv.classList.add("chosen-wild-card-color");
                        }
                    }
                }

                switch (this.getCard(i).getColorValue()) {
                    case "#0000FF":
                        cardDiv.classList.add("blue");
                        break;
                    case "#A60000":
                        cardDiv.classList.add("red");
                        break;
                    case "#004f19":
                        cardDiv.classList.add("green");
                        break;
                    case "#e5bf00":
                        cardDiv.classList.add("yellow");
                        break;
                    default:
                        cardDiv.classList.add("black");
                }
            } else {
                addCSSDesignToBackOfCard(cardDiv, cardSpanInner);
                if (i >= 7) {
                    cardDiv.style.display = "none";
                }
            }
        }
    };

    // compare selected card to playfield card
    this.isValid = function (card) {
        //Get in the value by element ID
        let cardColor = this.cards[card].color;
        let cardNumber = this.cards[card].value;

        // will run if there is a stackable card played, +2 or +4
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
        return false;
    };

    this.cardInvalid = function (card) {
        let audio = new Audio("error.mp3");
        if (players[gameTurn].isBot == false) audio.play();
        players[gameTurn].playerDeck.hand.childNodes[card].classList.add("invalid");
        setTimeout(function () {
            players[gameTurn].playerDeck.hand.childNodes[card].classList.remove(
                "invalid"
            );
        }, 500);
    };
}
