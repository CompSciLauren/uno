// Global Playfield Card
let playFieldCard;

//Creates a Global array to store players  --  TRAVIS
let players = [];

//Global Turn Tracker
let gameTurn = 0;

//sets direction of game, 1 for forward, -1 for backward
let gameDirection = 1;

//Global bot card index for playing cards
let botCardIndex = 0;

//Stores how many +2, or +4s are stacked
let drawStack = {
    cardValue: 0,
    stackAmt: 0,
    cardType: 2 // either 2 or 4
};

/**
 * card constructor
 * @param {*} color 
 * @param {*} value 
 */
function card(color, value) {
    this.color = color;
    this.value = value;
    this.getColorValue = function () {
        if (this.color == 'Red') {
            return '#A60000';
        } else if (this.color == 'Blue') {
            return '#0000FF';
        } else if (this.color == 'Green') {
            return '#004f19';
        } else if (this.color == 'Yellow') {
            return '#e5bf00';
        } else {
            return '#333333';
        }
    }
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
        let colorArray = ['Red', 'Green', 'Blue', 'Yellow']; //['Red', 'Green', 'Blue', 'Yellow', 'Special'];
        let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        let randValue = Math.floor((Math.random() * 13));
        if (randColor == 'Special') {
            randValue = randValue % 2;
        }
        let tempCard = new card(randColor, randValue);
        this.addCard(tempCard);
        this.reloadHand();
    };

    /**
     * removes card from hand and reloads hand (post-validation of good move)
     */
    this.playCard = function (c) {
        //Set playfield card to validated 'played' card
        playFieldCard.color = this.cards[c].color;
        playFieldCard.value = this.cards[c].value;

        //Get div elements that will be changed in HTML
        let divColor = document.getElementById('PlayfieldCardColor');
        let divValue = document.getElementById('PlayfieldCardValue');
        //Change inner HTML to match new global card values
        divColor.innerHTML = playFieldCard.color;
        divValue.innerHTML = playFieldCard.value;

        //Remove played card from hand
        this.removeCard(c);
        if (this.cards.length == 0) {
            alert(players[gameTurn].playerID + " wins!");
            location.reload();
            return;
        }
        this.reloadHand();
    };

    /**
     * Returns card at index c
     */
    this.getCard = function (c) {
        return (this.cards[c]);
    };

    /**
     * Reloads the player hand to have the most recent cards in player hand
     */
    this.reloadHand = function () {

        this.hand.innerHTML = "";
        let i = 0;
        for (i = 0; i < this.amtCards; i++) {
            let cardDiv = document.createElement('div');
            this.hand.append(cardDiv);
            cardDiv.classList.add('card');

            if (!this.isHidden) {
                cardDiv.innerHTML = this.getCard(i).value;
                cardDiv.style.backgroundColor = this.getCard(i).getColorValue();
            } else {
                cardDiv.style.backgroundColor = "#000000";
            }
        }
    };

    /**
     * For Testing. logs all cards and card amount
     */
    this.showDeck = function () {
        for (i = 0; i < this.amtCards; i++) {
            console.log(this.cards[i].color + " " + this.cards[i].value);
        }
        console.log("There are a total of " + this.amtCards + " in this deck");
    };

    /**
     * Compare selected card to playfield card
     */
    this.checkPlayerCardToPlayfield = function (c) {
        //Get in the value by element ID
        let cardColor = this.cards[c].color;
        let cardNumber = this.cards[c].value;
        if (cardColor == playFieldCard.color || cardColor == 'Special') {
            return (true);
        }
        if (cardNumber == playFieldCard.value) {
            return (true);
        }

        return (false);
    };//end of check card to playfield
}


/**
 * Testing function, plays a card
 */
function useCard() {
    let cardIndex;
    //If the player is a bot, get the card index by whatever picked
    if (players[gameTurn].playerID == "Bot"){
        cardIndex = botCardIndex;
        console.log("Bot card index: " + botCardIndex);
    }else{
    //Get in the value by element ID
    cardIndex = document.getElementById("cardIndex").value;
    }

    console.log("Card used: " + players[gameTurn].playerDeck.cards[cardIndex].color + " " + players[gameTurn].playerDeck.cards[cardIndex].value);

    //Validates the move is good (matching color/value)
    let isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(cardIndex);

    //Play card if valid move, otherwise ignore
    if (isValidCard == true)
    {
      let cardBeingPlayed = players[gameTurn].playerDeck.getCard(cardIndex);
      //Will run if there is a stackable card played, +2 or +4
      //Eric: Unneeded? Already check valid card from above
      
      if(drawStack.stackAmt != 0)
      {
        //Check deck if there's a valid card to stack on +2
        let validStackCard = false;
        for (let j = 0; j < players[gameTurn].playerDeck.amtCards; j++)
        {
          if (players[gameTurn].playerDeck.getCard(j).value == 10)
          {
            console.log("Valid card found at: " + j);
            validStackCard = true;
          }
        }
        //If no card found, draw 2 cards
        if (validStackCard == false)
        {
          drawACard();
          return;
        }

        if(cardBeingPlayed.value != drawStack.cardValue){
          cardInvalid();
          return;
        }
        else if(cardBeingPlayed.value == 1 && cardBeingPlayed.color != 'Special'){
          cardInvalid();
          return;
        }
      }
      
        players[gameTurn].playerDeck.playCard(cardIndex);

        if (cardBeingPlayed.color == 'Special') {
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

        // rotatePlayers();
        //return;
    }
    else {
      cardInvalid();
      return;
    }
    playerTurn();
}//end of useCard

/**
 * Function draws cards and adds them to playerhand
 */
function drawACard() {
  console.log("drew a card");
    if(drawStack.stackAmt != 0){
        let drawTimes = drawStack.cardType * drawStack.stackAmt;
        let i = 0;
        for (i = 0; i < drawTimes; i++) {
            players[gameTurn].playerDeck.drawCard();
        }
        rotatePlayers();
        playerTurn();
        drawStack.stackAmt = 0;
    } else {
        players[gameTurn].playerDeck.drawCard();
    }
}
//Initial crack at starting logic. If "Bot" name detected, should just try to play cards until winner then move on
 function botLogic(){
  console.log("Player is a bot!");
  let numBotCards = players[gameTurn].playerDeck.amtCards;

  //Bot behavior for Draw 2 cards
  if (playFieldCard.value == 10 && drawStack.stackAmt != 0)
  {
    for (let j = 0; j < numBotCards; j++)
    {
      if (players[gameTurn].playerDeck.getCard(j).value == 10)
      {
        botCardIndex = j;
         useCard();
        return true;
      }
    }
    drawACard();
    return true;
  }
  //Bot behavior for Draw 4 cards
  if (playFieldCard.value == -1  && drawStack.stackAmt != 0)
  {
    for (let k = 0; k < numBotCards; k++)
    {
      if (players[gameTurn].playerDeck.getCard(k).value == 10)
      {
        botCardIndex = k;
         useCard();
        return true;
      }
    }
    drawACard();
    return true;
  }
  //Standard bot behavior
  for(let i = 0; i < numBotCards; i++)
  {
      let isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(i);
      if (isValidCard == true) {
        botCardIndex = i;
         useCard();
        return true;
      }
  }
  //If not match, draw card and check. First check if last card is a match (no)
  let isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(players[gameTurn].playerDeck.amtCards - 1);
  console.log("last card valid: " + isValidCard);
  //Draw a card, then check if that new card is a match. Should break loop if it is
  while (isValidCard == false ){
    drawACard();
    isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(players[gameTurn].playerDeck.amtCards - 1);
    console.log(isValidCard + players[gameTurn].playerDeck.cards[players[gameTurn].playerDeck.amtCards - 1].color + + players[gameTurn].playerDeck.cards[players[gameTurn].playerDeck.amtCards - 1].value);
  }
  if (isValidCard == true){
    botCardIndex = players[gameTurn].playerDeck.amtCards - 1;
    setTimeout(function() {useCard();}, 2000);
     //useCard();
    return true;
  }
  return true;
}//end of bot logic

/**
 * Changes the global card object to random color/value assignment
 */
function SelectPlayfieldCard() {
    let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    let randValue = Math.floor((Math.random() * 10));
    playFieldCard = new card(randColor, randValue);
}


/**
 * Changes the displayed text and calls function to randomize playfield card
 */
function initializeWindow() {
    //Get div elements that will be changed in HTML
    let divColor = document.getElementById('PlayfieldCardColor');
    let divValue = document.getElementById('PlayfieldCardValue');

    //Reassign global card value to random values
    SelectPlayfieldCard();

    //Change innter HTML to match new global card values
    divColor.innerHTML = playFieldCard.color;
    divValue.innerHTML = playFieldCard.value;
}

/**
 * Tracks and displays the current player
 */
function playerTurn() {

    rotatePlayers();
    document.getElementById('playerID').innerHTML = players[gameTurn].playerID;
    players[gameTurn].playerDeck.reloadHand();
    console.log("playerTurn end check");
    console.log("===================turn end===================");
    checkPlayer();
    return;
}

/**
 * All players created, people and bots determined (future)
 */
function initializePlayers() {
    //Fills the players array with 2-4 people or bots (future, currently only allows two players)
    while (players.length < 2) {
        let playerHandDiv = "player" + (players.length + 1) + "Hand";

        let tempDeck;

        if (players.length == 0) {
            tempDeck = new deck(playerHandDiv, false);
        } else {
            tempDeck = new deck(playerHandDiv, false);
        }

        let tempID = "";
        while (tempID == "" || tempID == null) {
            tempID = prompt("Please enter your name.  If you would like to have a bot play for you, please enter the name 'Bot'");
        }
    }
}

//click event for play card HTML button
function clickEvent(){
  console.log("clickevent");
  if (players[gameTurn].playerID == "Bot"){
    //let botLogicReturn = false;
    //botLogicReturn = botLogic(); //setTimeout(function() {botLogic();}, 2000);
    setTimeout(function() {botLogic();}, 2000);
  }else{
    console.log("Player index: " + document.getElementById("cardIndex").value);
     useCard();
  }
}


//checks if the 'current' player is a bot. If so, do bot-stuff
function checkPlayer()
{
  console.log("checkPlayer PlayerID: " + players[gameTurn].playerID);
  if (players[gameTurn].playerID == "Bot"){
    clickEvent();
  }
  return;
}

//All players created  -- TRAVIS
function initializePlayers()
{
  //Fills the players array with 2-4 people or bots (future, currently only allows two players)
  while (players.length < 2)
  {
    let playerHandDiv = "player" + (players.length + 1) + "Hand";

      let tempDeck;

      if(players.length == 0){
        tempDeck = new deck(playerHandDiv,false);
      }else{
        tempDeck = new deck(playerHandDiv,false);   //set to true to blackout
      }

    let tempID = "";
    while (tempID == "" || tempID == null)
    {
      tempID = prompt("Please enter your name.  If you would like to have a bot play for you, please enter the name 'Bot'");
    }


        let tempIndex = players.length - 1;
        let tempPlayer = new player(tempDeck, tempID, tempIndex);

        //Automatically gives the player 7 cards
        let i = 0;
        for (i = 0; i < 7; i++) { tempDeck.drawCard(); }

        //adds the player to the game
        players.push(tempPlayer);
    }

    //Initial load
    document.getElementById('playerID').innerHTML = players[gameTurn].playerID;
    players[gameTurn].playerDeck.reloadHand();
}

/**
 * Player constructor
 * @param {*} deck 
 * @param {*} id 
 * @param {*} index 
 */
function player(deck, id, index) {
    this.playerDeck = deck;
    this.playerID = id;
    this.playerIndex = index;
}

function rotatePlayers() {
    gameTurn = gameTurn + gameDirection;

    if (gameTurn == players.length)
        gameTurn = 0;
    else if (gameTurn < 0)
        gameTurn = players.length - 1;
console.log("rotatePlayers check, player: " + gameTurn);
}

window.onload = initializeWindow();
window.onload = initializePlayers();



/* Special Card Implementations */

/**
 * Reverses the direction of player rotation
 */
function cardReverse() {
  console.log("Reverse Card!");
    if(players.length == 2){
        rotatePlayers();
    } else {
        gameDirection = (-1) * gameDirection;
    }
}




/**
 * Skips the next player in rotation
 */
function cardSkip(){
  console.log("Skip Card!");
    rotatePlayers();
}

//Make Wildcard a function that returns a new promise,
//this promise is a function with 2 parameters (also functions), accept/deny or something
//On good input, return accept, on bad return deny.
//Look into JS promises
/**
 * Card is wild
 */
 function cardWild(){
   return new Promise(resolve => {
    console.log("Wild Card! PlayerID: " + players[gameTurn].playerID);
    if (players[gameTurn].playerID == "Bot")
    {
      let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
      let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      document.getElementById('PlayfieldCardColor').innerHTML = randColor;

      playFieldCard.color = randColor;
      playFieldCard.value = -1;
      document.getElementById('wildColor').innerHTML = "";
      //Get div elements that will be changed in HTML
      let divColor = document.getElementById('PlayfieldCardColor');
      let divValue = document.getElementById('PlayfieldCardValue');
      //Change innter HTML to match new global card values
      divColor.innerHTML = playFieldCard.color;
      divValue.innerHTML = playFieldCard.value;
      console.log(playFieldCard.color);
    }
    else {
      let wildUI = document.createElement("div");
      document.getElementById('wildColor').append(wildUI);
      wildUI.classList.add("wildStyle");
      //Runs html allowing user to choose one of 4 correct colors  --  TRAVIS
      wildUI.innerHTML = "<form name='colorPick' id='myForm'> Enter the Color you want to switch to<br> <input type='radio' name='color' value='Red'>Red<br><input type='radio' name='color' value='Yellow'>Yellow<br><input type='radio' name='color' value='Blue'>Blue<br><input type='radio' name='color' value='Green'>Green<br><input type='button' id='colorButton' value='Pick'></form>";
      document.getElementById('colorButton').onclick = function() {
        playFieldCard.color = document.querySelector('input[name="color"]:checked').value;
        playFieldCard.value = -1;
        document.getElementById('wildColor').innerHTML = "";
        //Get div elements that will be changed in HTML
        let divColor = document.getElementById('PlayfieldCardColor');
        let divValue = document.getElementById('PlayfieldCardValue');
        //Change innter HTML to match new global card values
        divColor.innerHTML = playFieldCard.color;
        divValue.innerHTML = playFieldCard.value;
        console.log(playFieldCard.color);
        };
    }
    return true;
  }//end of resolve

  );//end of promise
}//end of cardWild

/**
 * Draws 2 cards
 */
function cardDraw2(){
  console.log("Draw 2 Card!");
    drawStack.stackAmt++;
    drawStack.cardType = 2;
    drawStack.cardValue = 10;
}

/**
 * Draws 4 cards
 */
function cardDraw4() {
  console.log("Draw 4 Card!");
    drawStack.stackAmt++;
    drawStack.cardType = 4;
    drawStack.cardValue = 1;
    // cardWild(); 
    // Temp, remove wildcard options for now
}

/**
 * Card not valid
 */
function cardInvalid() {
    let audio = new Audio('error.mp3');
    audio.play();
  console.log("Card invalid! Playfield card: " + playFieldCard.color + " " + playFieldCard.value);
}
