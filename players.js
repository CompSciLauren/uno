/**
 * Player constructor
 * @param {*} deck
 * @param {*} id
 * @param {*} index
 * @param {*} bot
 * @param {*} unoCall
 */
function player(deck, id, index, bot, unoCall) {
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
        if (players[gameTurn].playerDeck.amtCards == 2)
        {
          players[gameTurn].unoCall = true;
        }
        players[gameTurn].playerDeck.playCard(i);
        return;
      }
    }

    if (drawStack.stackAmt != 0) {
      drawACard();
    } else {
      //Draw a card, then check if that new card is a match. Should break loop if it is
      //The 20 card limit is just for testing, keeps infinite decks from being made
      while (!this.playerDeck.playCard(this.playerDeck.amtCards - 1)) {
        drawACard();
      }
    }
  };
}

function rotatePlayers() {
  gameTurn = gameTurn + gameDirection;

  if (gameTurn == players.length) gameTurn = 0;
  else if (gameTurn < 0) gameTurn = players.length - 1;

  players[gameTurn].playerDeck.reloadHand();
  if (gameTurn == 0) {
    $("#player1ID").css("font-weight", "bold");
    $("#player1ID").css("color", "black");
    $("#player2ID").css("font-weight", "normal");
    $("#player2ID").css("color", "gray");
  }
  else {
    $("#player2ID").css("font-weight", "bold");
    $("#player2ID").css("color", "black");
    $("#player1ID").css("font-weight", "normal");
    $("#player1ID").css("color", "gray");
  }

  console.log("rotatePlayers check, player: " + gameTurn);
}
