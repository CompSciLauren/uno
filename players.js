/**
 * Player constructor
 * @param {*} deck
 * @param {*} id
 * @param {*} index
 * @param {*} bot
 * @param {*} unoCall
 */
function Player(deck, id, index, bot, unoCall) {
  this.isBot = bot;
  this.playerDeck = deck;
  this.playerID = id;
  this.playerIndex = index;
  this.playerUnoCall = unoCall;
  this.botLogic = function () {
    let numBotCards = this.playerDeck.amtCards;

    //Standard bot behavior
    for (let i = 0; i < numBotCards; i++) {
      if (players[gameTurn].playerDeck.isValid(i)) {
        if (players[gameTurn].playerDeck.amtCards == 2) {
          players[gameTurn].unoCall = true;
        }
        players[gameTurn].playerDeck.playCard(i);
        return;
      }
    }

    if (drawStack.stackAmt != 0) {
      drawACard();
    } else {
      //Draw a card and check if it is a match. Will break loop if hits 20 card limit (prevents infinite decks)
      while (!this.playerDeck.playCard(this.playerDeck.amtCards - 1)) {
        drawACard();
      }
    }
  };
}

function rotatePlayers() {
  gameTurn = gameTurn + gameDirection;

  if (gameTurn == players.length) {
    gameTurn = 0;
  }
  else if (gameTurn < 0) {
    gameTurn = players.length - 1;
  }
}
