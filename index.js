$(document).ready(function () {
  $(document).on("click", ".card", function () {
    let cardIndex = $('.my-card').index(this);
    console.log("index: " + cardIndex);
    useCard(cardIndex);
  });
});

// Global Playfield Card
let discardPile = new deck(discardDeckDiv, false);

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
  //Reassign global card value to random values
  SelectPlayfieldCard();
  refreshPlayfieldCardVisual();
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

    let tempID = document.getElementById("playerName").value;

    let tempIndex = players.length - 1;

    let isBot = false;
    if (players.length != 0 || tempID == "Bot") {
      tempID = "Bot"
      isBot = true;
    }

    let tempPlayer = new player(tempDeck, tempID, tempIndex, isBot, false);

    //adds the player to the game
    players.push(tempPlayer);

    //Automatically gives the player initial cards
    for (let i = 0; i < initialCards; i++) {
      players[players.length - 1].playerDeck.drawCard();
    }
  }

  document.getElementById("player1ID").innerHTML = players[0].playerID;
  $("#player1ID").css("font-weight", "bold");
  $("#player1ID").css("color", "black");
  $("#player2ID").css("color", "gray");

  document.getElementById("player2ID").innerHTML = players[1].playerID;

  play();
}


function startGame(){
  let playerNameInput = document.getElementById("playerName");
  let playerName = playerNameInput.value;
  playerNameInput.classList.remove("is-valid");
  if(playerName.length == 0){
     playerNameInput.classList.add("is-invalid");
    return;
  }
    document.getElementById("setupGame").classList.add("d-none");
    document.getElementById("playingField").classList.remove("d-none");
    let playerAmtDiv = document.getElementById("amtPlayers");
    let playerAmt = playerAmtDiv.options[playerAmtDiv.selectedIndex].value;
    amtPlayers = playerAmt;

    initializeWindow();
    initializePlayers();
}




/**
 * Play
 */
function play() {
  setTimeout(function () {
    if (players[gameTurn].isBot) {
      players[gameTurn].botLogic();
    }
  }, 1500);
}

/**
 * Player's uno call button. Must be pressed BEFORE playing second to last card
 */
function callUno(){
  console.log("Amt of cards: " + players[gameTurn].playerDeck.amtCards);
  if (players[gameTurn].playerDeck.amtCards > 2)
  {
    console.log("Player called Uno too early");
  }
  else
  {
    console.log("Successful Uno call protection");
    players[gameTurn].unoCall = true;
  }
}

//for debug
function checkUno(){
  console.log("Unocall: " + players[gameTurn].unoCall);
}

function refreshPlayfieldCardVisual() {
  let pfcDiv = document.getElementById("discardDeckDiv");
  pfcDiv.innerHTML = " ";
  for (let i = 0; i < discardPile.cards.length; i++){
    let cardDiv = document.createElement("div");
    pfcDiv.append(cardDiv);
    cardDiv.classList.add("card");
    cardDiv.innerHTML = discardPile.cards[i].value;
    cardDiv.style.backgroundColor = discardPile.cards[i].getColorValue();
  }
}
