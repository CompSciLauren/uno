$(document).ready(function () {
  $(document).on("click", ".card", function () {
    let cardIndex = $('.my-card').index(this);
    console.log("index: " + cardIndex);
    useCard(cardIndex);
  });
});

// Global Playfield Card
let playFieldCard;

//Creates a Global array to store players  --  TRAVIS
let players = [];

//Amount of players in the game
let amtPlayers = 2;

//Initial amount of cards for each player
let initialCards = 7;

//Global Turn Tracker
let gameTurn = 0;

//sets direction of game, 1 for forward, -1 for backward
let gameDirection = 1;

//Stores how many +2, or +4s are stacked
let drawStack = {
  cardValue: 0,
  stackAmt: 0,
  cardType: 2 // either 2 or 4
};

/**
 * Changes the displayed text and calls function to randomize playfield card
 */
function initializeWindow() {
  //Get div elements that will be changed in HTML
  let divColor = document.getElementById("PlayfieldCardColor");
  let divValue = document.getElementById("PlayfieldCardValue");

  //Reassign global card value to random values
  SelectPlayfieldCard();

  //Change innter HTML to match new global card values
  divColor.innerHTML = playFieldCard.color;
  divValue.innerHTML = playFieldCard.value;
}

//All players created  -- TRAVIS
function initializePlayers() {
  //Fills the players array with 2-4 people or bots (future, currently only allows two players)
  while (players.length < amtPlayers) {
    let playerHandDiv = "player" + (players.length + 1) + "Hand";

    let tempDeck;

    if (players.length == 0) {
      tempDeck = new deck(playerHandDiv, false);
    } else {
      tempDeck = new deck(playerHandDiv, true); //set to true to blackout
    }

    let tempID = "";
    while (tempID == "" || tempID == null) {
      tempID = prompt(
        "Please enter your name.  If you would like to have a bot play for you, please enter the name 'Bot'"
      );
    }

    let tempIndex = players.length - 1;

    let isBot = false;
    if (tempID == "Bot") {
      isBot = true;
    }

    let tempPlayer = new player(tempDeck, tempID, tempIndex, isBot);

    //adds the player to the game
    players.push(tempPlayer);

    //Automatically gives the player initial cards
    for (let i = 0; i < initialCards; i++) {
      players[players.length - 1].playerDeck.drawCard();
    }
  }

  document.getElementById("player1ID").innerHTML = players[0].playerID;
  $("#player1ID").css("font-weight", "bold");

  document.getElementById("player2ID").innerHTML = players[1].playerID;

  play();
}

window.onload = initializeWindow();
window.onload = initializePlayers();

/**
 * Play
 */
function play() {
  setTimeout(function () {
    if (players[gameTurn].isBot) {
      players[gameTurn].botLogic();
    }
  }, 1000);
}
