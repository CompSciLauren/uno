$(document).ready(function () {
  $(document).on("click", ".card", function () {
    let cardIndex = $('.my-card').index(this);
    console.log("index: " + cardIndex);
    useCard(cardIndex);
  });
});

// Global Playfield Card
let playFieldCard;
let playfieldCardArray = [];

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
  $("#player1ID").css("color", "black");
  $("#player2ID").css("color", "gray");

  document.getElementById("player2ID").innerHTML = players[1].playerID;

  play();
}


function startGame(){
  let playerNameInput = document.getElementById("playerName");
  let playerName = playerNameInput.value;
  
  playerNameInput.style.border = "none";
  if(playerName.length == 0){
     playerNameInput.style.border = "red 1px solid";
    playerNameInput.placeholder = "Please Input a Name";
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
  }, 1000);
}

function refreshPlayfieldCardVisual() {
  let pfcDiv = document.getElementById("PlayfieldCardDiv");
  let cardDiv = document.createElement("div");
  pfcDiv.innerHTML = " ";
  pfcDiv.append(cardDiv);
  cardDiv.classList.add("card");
  cardDiv.innerHTML = playFieldCard.value;
  cardDiv.style.backgroundColor = playFieldCard.getColorValue();
}