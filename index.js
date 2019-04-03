/*
Author: Eric Seitz
KUID: 2928468
Assignment: Project 3
Date: Mar 28 2019
Class: EECS 448
*/


// Global Playfield Card
let playFieldCard;

//Creates a Global array to store players  --  TRAVIS
let players = [];

//Global Turn Tracker
let gameTurn = 0;

//card constructor
function card(color,value){
    this.color = color;
    this.value = value;
    this.getColorValue = function(){
        if(this.color == 'Red'){
            return '#A60000';
        }else if(this.color == 'Blue'){
            return '#2C0066';
        }else if(this.color == 'Green'){
            return '#004f19';
        }else if(this.color == 'Yellow'){
            return '#e5bf00';
        }else{
            return '#333333';
        }
    }
}

//deck constructor
function deck(){
    this.cards = [];
    this.amtCards = 0;

    // Adds a card to the cards array
    this.addCard = function(c){
        this.cards.push(c);
        this.amtCards = this.cards.length;
    };


    // removes a card from card array
    this.removeCard = function(c){
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
    this.playCard = function(c){
        //Set playfield card to validated 'played' card
        playFieldCard.color = this.cards[c].color;
        playFieldCard.value = this.cards[c].value;

        //Get div elements that will be changed in HTML
        let divColor = document.getElementById('PlayfieldCardColor');
        let divValue = document.getElementById('PlayfieldCardValue');
        //Change innter HTML to match new global card values
        divColor.innerHTML = playFieldCard.color;
        divValue.innerHTML = playFieldCard.value;

        //Remove played card from hand
        this.removeCard(c);
        this.reloadHand();
    };

    //Returns card at index c
    this.getCard = function(c){
        return(this.cards[c]);
    };

    //Reloads the player hand to have the most recent cards in player hand
    this.reloadHand = function(){
        let hand = document.getElementById('playerHand');
        hand.innerHTML = "";
        let i = 0;
        for( i = 0; i < this.amtCards; i++){
            let cardDiv = document.createElement('div');
            hand.append(cardDiv);
            cardDiv.innerHTML = this.getCard(i).value;
            cardDiv.classList.add('card');
            cardDiv.style.backgroundColor = this.getCard(i).getColorValue();
        }
    };

    //For Testing. logs all cards and card amount
    this.showDeck = function(){
        for(i = 0; i < this.amtCards; i++){
            console.log(this.cards[i].color + " " + this.cards[i].value);
        }
        console.log("There are a total of " + this.amtCards + " in this deck");
    };

    //Compare selected card to playfield card
    this.checkPlayerCardToPlayfield = function(c){
    //Get in the value by element ID
    let cardColor = this.cards[c].color;
    let cardNumber = this.cards[c].value;
    if (cardColor == playFieldCard.color)
    {
        return(true);
    }
    if (cardNumber == playFieldCard.value)
    {
        return(true);
    }

    return(false);
    };//end of check card to playfield
}


//Testing function, plays a card
function useCard()
{
    //Get in the value by element ID
    let cardIndex = document.getElementById("cardIndex").value;
    //Validates the move is good (matching color/value)
    let isValidCard = players[gameTurn].playerDeck.checkPlayerCardToPlayfield(cardIndex);
    //Play card if valid move, otherwise ignore
    if (isValidCard == true)
    {
        alert("Debug: Valid move.");
        players[gameTurn].playerDeck.playCard(cardIndex);
        gameTurn++;
        return;
    }
    alert("Debug: Invalid move.");
}



//Changes the global card object to random color/value assignment
function SelectPlayfieldCard()
{
    let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    let randValue = Math.floor((Math.random() * 10));
    playFieldCard = new card(randColor,randValue);
}


//Changes the displayed text and calls function to randomize playfield card
function initializeWindow()
{
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
  if (gameTurn == players.length)
    gameTurn = 0;
  else if (gameTurn < 0)
    gameTurn = players.length - 1;

  let divPlayer = document.getElementById('playerID');
  divPlayer.innerHTML = players[gameTurn].playerID;
  players[gameTurn].playerDeck.reloadHand();
}

//All players created, people and bots determined (future)  -- TRAVIS
function initializePlayers()
{
  //Fills the players array with 2-4 people or bots (future, currently only allows two players)
  while (players.length < 2)
  {
    let tempDeck = new deck();
    let tempID = "";
    while (tempID == "" || tempID == null)
    {
      tempID = prompt("Please enter your name.  If you would like to have a bot play for you, please enter the name 'Bot'");
    }

    let tempIndex = players.length - 1;
    let tempPlayer = new player(tempDeck, tempID, tempIndex);

    //Automatically gives the player 7 cards
    let i = 0;
    for(i = 0; i< 7; i++){tempDeck.drawCard();}

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

window.onload = initializeWindow();
//window.onload = initializePlayers();
window.onlad = testInitializePlayers();



//Delete, Only here to automatically add players to save time with testing.
function testInitializePlayers()
{
  //Fills the players array with 2-4 people or bots (future, currently only allows two players)
    let customPlayers = ["earving", "bot"];
  while (players.length < 2)
  {
    let tempDeck = new deck();
    let tempID = customPlayers[players.length];
    let tempIndex = players.length - 1;
    let tempPlayer = new player(tempDeck, tempID, tempIndex);

    //Automatically gives the player 7 cards
    let i = 0;
    for(i = 0; i< 7; i++){tempDeck.drawCard();}

    //adds the player to the game
    players.push(tempPlayer);
  }

  //Begins the first turn of the game
  playerTurn();
}
