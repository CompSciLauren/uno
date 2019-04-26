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
let amtPlayers = 4;

//Initial amount of cards for each player
let initialCards = 7;

//Global Turn Tracker
let gameTurn = 0;

//sets direction of game, 1 for forward, -1 for backward
let gameDirection = 1;

//stores if initial draw
let initialDraw = true;

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

/**
 * Cheat console command. 
 * Gives a new playfield card
 */
 function newPlayfieldCard() {
  initializeWindow();
 }


/**
 * Cheat console command. 
 * Gives player a specific card (testing: red 1 only)
 */
function giveMeABreak(cardColor, cardValue) {
  if (cardColor == "Special" && cardValue > 1 || cardValue < 0)
  {
    console.log("Invalid wild card selection: " + cardColor + " " + cardValue);
    return;
  } else if (cardValue > 12)
  {
    console.log("Invalid card selection: " + cardColor + " " + cardValue);
    return;
  } else
  {
    drawSpecificCard(cardColor, cardValue);
  }
 }

/**
 * Cheat console command. 
 * Gives player a specific card (testing: red 1 only)
 */
function forceDraw(numCards) {
  if (numCards > 0)
  {
    drawManyCard(numCards);
  }
  else
  {
    console.log("Invalid number of cards: " + numCards);
  }
 }

/**
* Cheat console command. 
* Lists cheatcode in console
*/
function showMeCheats() {
  console.log("newPlayfieldCard() -- Adds a new playfield card to top of stack");
  console.log(" ");
  console.log('giveMeABreak("Color", Value) -- Adds a specific card to players hand');
  console.log("     Possible card colors: Red, Green, Blue, Yellow, Special");
  console.log("     Possible card values for R-G-B-Y: 0-9, 10 (for draw 2), 11 (for reverse), 12 (for skip)");
  console.log("     Possible card values for 'Special': 0 (for Wild), 1 (for Wild + Draw 4)");
  console.log(" ");
  console.log("forceDraw(number) -- Draws the specific number of cards from the deck and adds to the player's hand");

 }

//All players created  -- TRAVIS
function initializePlayers() {
  //Fills the players array with 2-4 people or bots (future, currently only allows two players)
  let seats =["BottomSeat","RightSeat","TopSeat","LeftSeat"];
  let botNames = ["Justa Guye","Homer Sapien","Pierre Son","Mist Tyre","Jin Tellmin","Guy Pierreson","Norm Hal","Avery Mann","Hugh Man","Aver Ageman","Amanda Skyzdazawoman","Guy Chapman", "Aman Justasyu", "Sivi Lian", "Norma Laedie", "Nunya Concern","Noab Elman","Lay Dee", "Notta Imposter", "Justin Disgais", "Naeem Hiddon", "Aylov Peypul", "Jawl E. Goodfellow","Roger Otto Benjamin Olsen Tanner"];
  while (players.length < amtPlayers) {
    let seatIndex = Math.round(4/amtPlayers) * (players.length);
    let playerHandDiv = seats[seatIndex];
    let playerHandLabel = playerHandDiv + "ID";

    let tempDeck;

    if (players.length == 0) {
      tempDeck = new deck(playerHandDiv, false);
    } else {
      tempDeck = new deck(playerHandDiv, true); //set to true to blackout
    }

    let tempID = document.getElementById("playerName").value;

    let tempIndex = players.length - 1;

    let isBot = false;
    
    let botIndex = Math.floor(Math.random() * botNames.length);
    let botName = botNames[botIndex];
    
    if (players.length != 0 || tempID == "Bot") {
      tempID = botName;
      botNames.splice(botIndex, 1);
      isBot = true;
    }
    
    document.getElementById(playerHandLabel).innerHTML = "<h3>" + tempID + "</h3>";

    let tempPlayer = new player(tempDeck, tempID, tempIndex, isBot, false);

    //adds the player to the game
    players.push(tempPlayer);

    //Automatically gives the player initial cards
    for (let i = 0; i < initialCards; i++) {
      players[players.length - 1].playerDeck.drawCard();
    }
  }

  initialDraw = false;
  
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
  if (players[gameTurn].isBot) {
    setTimeout(function () {
      for(let i = 0; i < players.length; i++){
        document.getElementById(players[i].playerDeck.hand.id + "ID").childNodes[0].classList.remove("activePlayer");
      }
      document.getElementById(players[gameTurn].playerDeck.hand.id + "ID").childNodes[0].classList.add("activePlayer");
      players[gameTurn].botLogic();
    }, 1500);
  }else{
      for(let i = 0; i < players.length; i++){
        document.getElementById(players[i].playerDeck.hand.id + "ID").childNodes[0].classList.remove("activePlayer");
      }
      document.getElementById(players[gameTurn].playerDeck.hand.id + "ID").childNodes[0].classList.add("activePlayer");
  }
}

/**
 * Player's uno call button. Must be pressed BEFORE playing second to last card
 */
function callUno(){
  //console.log("Amt of cards: " + players[gameTurn].playerDeck.amtCards);
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
