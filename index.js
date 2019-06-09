$(document).ready(function () {
  $(document).on("click", ".my-card", function () {
    let cardIndex = $(".my-card").index(this);
    players[gameTurn].playerDeck.playCard(cardIndex);
  });
});

// global Playfield Card
let discardPile = new Deck("discardDeckDiv", false);

// create a Global array to store players
let players = [];

// amount of players in the game
let amtPlayers = 4;

// initial amount of cards for each player
let initialCards = 7;

// global Turn Tracker
let gameTurn = 0;

// set direction of game, 1 for forward, -1 for backward
let gameDirection = 1;

// store if initial draw
let initialDraw = true;

// store how many +2, or +4s are stacked
let drawStack = {
  cardValue: 0,
  stackAmt: 0,
  cardType: 2, // either 2 or 4
  updateStack: function () {
    document.getElementById("drawCardPile").innerHTML =
      "+" + this.cardType * this.stackAmt;
  },
  clearVisual: function () {
    document.getElementById("drawCardPile").innerHTML = "";
  }
};

/**
 * Change the displayed text and call function to randomize playfield card
 */
function initializeWindow() {
  // re-assign global card value to random values
  selectPlayfieldCard();
  discardPile.reloadHand();
}

function initializePlayers() {
  // fill the players array with 2-4 people or bots (future; currently only allows two players)
  let seats = ["BottomSeat", "RightSeat", "TopSeat", "LeftSeat"];
  let botNames = [
    "Buffy Summers",
    "Hermione Granger",
    "Derek Zoolander",
    "Elle Woods",
    "Dr. Rumack",
    "Wade Wilson",
    "Chon Wang",
    "Regina George",
    "Ron Burgundy",
    "Lord Dark Helmet",
    "Edna Mode",
    "Randle McMurphy",
    "Optimus Prime",
    "Clarice Starling",
    "Norman Bates",
    "Groot",
    "Leslie Knope",
    "Gromit",
    "Red",
    "Samwise Gamgee",
    "Bilbo Baggins",
    "Katherine G. Johnson",
    "Ace Ventura",
    "Sarah Connor",
    "Axel Foley",
    "Elaine Benes",
    "Daenerys Targaryen",
    "Dorothy Gale",
    "Vito Corleone",
    "Arya Stark",
    "Shuri",
    "Shaun Riley",
    "Obi-Wan Kenobi",
    "Captain America",
    "Ferris Bueller",
    "Dorothy Vaughan",
    "Rocky Balboa",
    "Atticus Finch",
    "Brienne of Tarth",
    "Jules Winnfield",
    "Peter Venkman",
    "Gandalf",
    "Imperator Furiosa",
    "Forrest Gump",
    "Sansa Stark",
    "Patrick Bateman",
    "Rey",
    "Hannibal Lecter",
    "Doc Brown",
    "Rick Blaine",
    "Captain Jack Sparrow",
    "Ellen Ripley",
    "Mary Jackson",
    "Iron Man",
    "Marty McFly",
    "Michael Corleone",
    "Annalise Keating",
  ];

  while (players.length < amtPlayers) {
    let seatIndex = Math.round(4 / amtPlayers) * players.length;
    let playerHandDiv = seats[seatIndex];
    let playerHandLabel = playerHandDiv + "ID";

    let tempDeck;

    if (players.length == 0) {
      tempDeck = new Deck(playerHandDiv, false);
    } else {
      tempDeck = new Deck(playerHandDiv, true); // set to true to blackout
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

    document.getElementById(playerHandLabel).innerHTML =
      "<h3>" + tempID + "</h3>";

    let tempPlayer = new Player(tempDeck, tempID, tempIndex, isBot, false);

    players.push(tempPlayer);

    for (let i = 0; i < initialCards; i++) {
      players[players.length - 1].playerDeck.drawCard();
    }
  }

  initialDraw = false;

  play();
}

function startGame() {
  let playerNameInput = document.getElementById("playerName");
  let playerName = playerNameInput.value;
  playerNameInput.classList.remove("is-valid");
  if (playerName.length == 0) {
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

function play() {
  if (players[gameTurn].isBot) {
    setTimeout(function () {
      for (let i = 0; i < players.length; i++) {
        document
          .getElementById(players[i].playerDeck.hand.id + "ID")
          .childNodes[0].classList.remove("activePlayer");
      }
      document
        .getElementById(players[gameTurn].playerDeck.hand.id + "ID")
        .childNodes[0].classList.add("activePlayer");
      players[gameTurn].botLogic();
    }, 1000);
  } else {
    setTimeout(function () {
      for (let i = 0; i < players.length; i++) {
        document
          .getElementById(players[i].playerDeck.hand.id + "ID")
          .childNodes[0].classList.remove("activePlayer");
      }
      document
        .getElementById(players[gameTurn].playerDeck.hand.id + "ID")
        .childNodes[0].classList.add("activePlayer");
    }, 1000);
  }
}

/**
 * Uno call button
 */
function callUno() {
  if (players[gameTurn].playerDeck.amtCards > 2) {
    players[gameTurn].playerDeck.drawCard();
    players[gameTurn].playerDeck.drawCard();
  } else {
    players[gameTurn].unoCall = true;
  }
}
