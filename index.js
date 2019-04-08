// Global Playfield Card
let playFieldCard;

//Creates a Global array to store players  --  TRAVIS
let players = [];

//Global Turn Tracker
let gameTurn = 0;

//sets direction of game, 1 for forward, -1 for backward
let gameDirection =1;

//Stores how many +2, or +4s are stacked
let drawStack ={
    cardValue: 0,
    stackAmt: 0,
    cardType: 2 // either 2 or 4
};

//card constructor
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

//deck constructor

function deck(divId, hidden){

    this.cards = [];
    this.amtCards = 0;
    this.hand = document.getElementById(divId);
    this.isHidden = hidden;

    // Adds a card to the cards array
    this.addCard = function (c) {
        this.cards.push(c);
        this.amtCards = this.cards.length;
    };

    // removes a card from card array
    this.removeCard = function (c) {
        this.cards.splice(c, 1);
        this.amtCards = this.cards.length;
    };

    // Gives player a random card
    this.drawCard = function(){
        let colorArray = ['Red', 'Green', 'Blue', 'Yellow', 'Special'];
        let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        let randValue = Math.floor((Math.random() * 13));
        if (randColor == 'Special'){
            randValue = randValue % 2;
        }
        let tempCard = new card(randColor,randValue);
        this.addCard(tempCard);
        this.reloadHand();
    };

    //removes card from hand and reloads hand (post-validation of good move)
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
            alert("You win!");
            location.reload();
            return;
        }
        this.reloadHand();
    };

    //Returns card at index c
    this.getCard = function (c) {
        return (this.cards[c]);
    };

    //Reloads the player hand to have the most recent cards in player hand

    this.reloadHand = function(){

        this.hand.innerHTML = "";
        let i = 0;
        for (i = 0; i < this.amtCards; i++) {
            let cardDiv = document.createElement('div');
            this.hand.append(cardDiv);
            cardDiv.classList.add('card');

            if(!this.isHidden){
                cardDiv.innerHTML = this.getCard(i).value;
                cardDiv.style.backgroundColor = this.getCard(i).getColorValue();
            }else{
                cardDiv.style.backgroundColor = "#000000";
            }

        }
    };

    //For Testing. logs all cards and card amount
    this.showDeck = function () {
        for (i = 0; i < this.amtCards; i++) {
            console.log(this.cards[i].color + " " + this.cards[i].value);
        }
        console.log("There are a total of " + this.amtCards + " in this deck");
    };

    //Compare selected card to playfield card
    this.checkPlayerCardToPlayfield = function(c){
    //Get in the value by element ID
    let cardColor = this.cards[c].color;
    let cardNumber = this.cards[c].value;
    if (cardColor == playFieldCard.color || cardColor == 'Special')
    {
        return(true);
    }
    if (cardNumber == playFieldCard.value)
    {
        return(true);
    }

        return (false);
    };//end of check card to playfield
}


//Testing function, plays a card
function useCard() {
    //Get in the value by element ID
    let cardIndex = document.getElementById("cardIndex").value;
    //Validates the move is good (matching color/value)
    let isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(cardIndex);
    //Play card if valid move, otherwise ignore
    if (isValidCard == true)
    {
        let cardBeingPlayed = players[gameTurn].playerDeck.getCard(cardIndex);


        //Will run if there is a stackable card played, +2 or +4
        if(drawStack.stackAmt != 0){
                if(cardBeingPlayed.value != drawStack.cardValue){
                      //alert("Card chosen Doesn't stack");
                      cardInvalid();
                    return;
                }else if(cardBeingPlayed.value == 1 && cardBeingPlayed.color != 'Special'){
                      //alert("Card chosen Doesn't stack");
                      cardInvlaid();
                    return;
                }else{
                  //alert("Debug: Valid move.");
                }
        }else{
          //alert("Debug: Valid move.");
        }

        players[gameTurn].playerDeck.playCard(cardIndex);

        if(cardBeingPlayed.color == 'Special'){
            if(cardBeingPlayed.value == 0){
                cardWild();
            }else if(cardBeingPlayed.value == 1){
                cardDraw4();
            }
        }else if(cardBeingPlayed.value == 10){
            cardDraw2();
        }else if(cardBeingPlayed.value == 11){
            cardReverse();
        }else if(cardBeingPlayed.value == 12){
            cardSkip();
        }

        rotatePlayers();
        return;
    }
    else {
      cardInvalid();
    }
}

//Function draws cards and adds them to playerhand
function drawACard(){
    if(drawStack.stackAmt != 0){
        let drawTimes = drawStack.cardType * drawStack.stackAmt;
        let i = 0;
        for(i = 0; i < drawTimes; i++){
            players[gameTurn].playerDeck.drawCard();
        }
        rotatePlayers();
        playerTurn();
        drawStack.stackAmt = 0;
    }else{
        players[gameTurn].playerDeck.drawCard();
    }
<<<<<<< HEAD
=======
>>>>>>> master
}
//Initial crack at starting logic. If "Bot" name detected, should just try to play cards until winner then move on
function botLogic(){
  console.log("Player is a bot!");
  let numBotCards = players[gameTurn].playerDeck.amtCards;
  console.log("num of bot cards: " + numBotCards);
  //Check through all current bot cards for a match
  for(let i = 0; i < numBotCards; i++)
  {
      let isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(i);
      if (isValidCard == true) {
          //alert("Debug: Valid move.");
          players[gameTurn].playerDeck.playCard(i);
          gameTurn++;
          return;
      }
  }
  //If not match, draw card and check. First check if last card is a match (no)
  let isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(players[gameTurn].playerDeck.amtCards - 1);
  console.log("last card valid: " + isValidCard);
  //Draw a card, then check if that new card is a match. Should break loop if it is
  //The 20 card limit is just for testing, keeps infinite decks from being made
  while (isValidCard == false && players[gameTurn].playerDeck.amtCards < 20 ){
  players[gameTurn].playerDeck.drawCard();
  isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(players[gameTurn].playerDeck.amtCards - 1);
  console.log(isValidCard + players[gameTurn].playerDeck.cards[players[gameTurn].playerDeck.amtCards - 1].color + + players[gameTurn].playerDeck.cards[players[gameTurn].playerDeck.amtCards - 1].value);
  }
  if (isValidCard == true) {
      //alert("Debug: Valid move.");
      players[gameTurn].playerDeck.playCard(players[gameTurn].playerDeck.amtCards - 1);
      gameTurn++;
      return;
  }
}

//Changes the global card object to random color/value assignment
function SelectPlayfieldCard() {
    let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    let randValue = Math.floor((Math.random() * 10));
    playFieldCard = new card(randColor, randValue);
}


//Changes the displayed text and calls function to randomize playfield card
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

//Tracks and displays the current player  -- TRAVIS
function playerTurn()
{

  let divPlayer = document.getElementById('playerID');
  divPlayer.innerHTML = players[gameTurn].playerID;
  players[gameTurn].playerDeck.reloadHand();
  if (players[gameTurn].playerID == "Bot"){
      botLogic();
      setTimeout(function() {rotatePlayers();}, 1000);
      return;
      }
}

//All players created, people and bots determined (future)  -- TRAVIS
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
        for (i = 0; i < 3; i++) { tempDeck.drawCard(); }

        //adds the player to the game
        players.push(tempPlayer);
    }

    //Begins the first turn of the game
    playerTurn();
}

//Player constructor -- TRAVIS
function player(deck, id, index)
{
  this.playerDeck = deck;
  this.playerID = id;
  this.playerIndex = index;
}

function rotatePlayers(){
    gameTurn = gameTurn + gameDirection;

    if (gameTurn == players.length)
        gameTurn = 0;
    else if (gameTurn < 0)
        gameTurn = players.length - 1;
}

window.onload = initializeWindow();
window.onload = initializePlayers();



/* Special Card Implementations */

//Reverses the direction of player rotation
function cardReverse(){
    if(players.length == 2){
        rotatePlayers();
    }else{
        gameDirection = (-1) * gameDirection;
    }
}

//Skips the next player in rotation
function cardSkip(){
    rotatePlayers();
}

function cardWild(){
<<<<<<< HEAD
=======
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
      };

//    newColor = prompt("Enter the Color You want to switch to");
//    playFieldCard.color = newColor;
//    playFieldCard.value = -1;
>>>>>>> master
}

function cardDraw2(){
    drawStack.stackAmt++;
    drawStack.cardType = 2;
    drawStack.cardValue = 10;
}

function cardDraw4(){
    drawStack.stackAmt++;
    drawStack.cardType = 4;
    drawStack.cardValue = 1;
    cardWild();
}
<<<<<<< HEAD
=======

function cardInvalid()
{
  let audio = new Audio('error.mp3');
  audio.play();
}
>>>>>>> master
