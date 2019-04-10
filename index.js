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
        let colorArray = ['Red', 'Green', 'Blue', 'Yellow', 'Special'];
        let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        let randValue = Math.floor((Math.random() * 13));
        if (randColor == 'Special') {
            randValue = randValue % 2;
        }
        let tempCard = new card(randColor, randValue);
        this.addCard(tempCard);
        this.reloadHand();
        console.log(players[gameTurn].playerID + " Drew a " + randColor + " " + randValue); //testing
    };

    /**
     * removes card from hand and reloads hand (post-validation of good move)
     */
    this.playCard = function (c) {
        
        if(this.isValid(c)){      
            
            console.log(this.getCard(c).color + " " + this.getCard(c).value);
            
            //Set playfield card to validated 'played' card
            playFieldCard.color = this.cards[c].color;
            playFieldCard.value = this.cards[c].value;

            //Get div elements that will be changed in HTML
            let divColor = document.getElementById('PlayfieldCardColor');
            let divValue = document.getElementById('PlayfieldCardValue');

            //Change inner HTML to match new global card values
            divColor.innerHTML = playFieldCard.color;
            divValue.innerHTML = playFieldCard.value;

            
            let cardBeingPlayed = this.cards[c];

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
            
            //Remove played card from hand
            this.removeCard(c);
            if (this.cards.length == 0) {
                alert("You win!");
                location.reload();
                return;
            }
            
        }else{
            this.cardInvalid();
            return false;

        }
        
        this.reloadHand();
        rotatePlayers();
        play();
        return true;
        
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


    //Compare selected card to playfield card
    this.isValid = function(c){
      //Get in the value by element ID
      let cardColor = this.cards[c].color;
      let cardNumber = this.cards[c].value;
        
      //Will run if there is a stackable card played, +2 or +4
      if(drawStack.stackAmt != 0)
      {
        if(cardNumber != drawStack.cardValue){
          return false;
        }
        else if(cardNumber == 1 && cardColor != 'Special'){
          return false;
        }else{
          return true;
        }
      }
        
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
    
    this.cardInvalid = function()
    {
      let audio = new Audio('error.mp3');
      audio.play();
    }
}


/**
 * Testing function, plays a card
 */
function useCard() {
    
    //Get in the value by element ID
    let cardIndex = document.getElementById("cardIndex").value;

    //Play card
    players[gameTurn].playerDeck.playCard(cardIndex);
}

/**
 * Function draws cards and adds them to playerhand
 */
function drawACard(){
    

    if(drawStack.stackAmt != 0){
        let drawTimes = drawStack.cardType * drawStack.stackAmt;
        let i = 0;
        for (i = 0; i < drawTimes; i++) {
            players[gameTurn].playerDeck.drawCard();
        }
        
        drawStack.stackAmt = 0;
        rotatePlayers();
        play();
    }else{
        players[gameTurn].playerDeck.drawCard();
    }
}

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



//All players created  -- TRAVIS
function initializePlayers()
{
  //Fills the players array with 2-4 people or bots (future, currently only allows two players)
  while (players.length < amtPlayers)
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
      
        let isBot = false;
        if(tempID == 'Bot'){
            isBot = true;
        }
      
        let tempPlayer = new player(tempDeck, tempID, tempIndex, isBot);
      
        //adds the player to the game
        players.push(tempPlayer);

        //Automatically gives the player initial cards
        for (let i = 0; i < initialCards; i++) { players[players.length - 1].playerDeck.drawCard(); }


    }
    
    document.getElementById('playerID').innerHTML = players[gameTurn].playerID;
    
    play();
}

/**
 * Player constructor
 * @param {*} deck 
 * @param {*} id 
 * @param {*} index 
 * @param {*} bot
 */
function player(deck, id, index, bot)
{
  this.isBot = bot;
  this.playerDeck = deck;
  this.playerID = id;
  this.playerIndex = index;
  this.botLogic = function(){
      
      let numBotCards = this.playerDeck.amtCards;


      //Standard bot behavior
      for(let i = 0; i < numBotCards; i++)
      {
          if(players[gameTurn].playerDeck.playCard(i)){
              return;
          }
      }
      
      if(drawStack.stackAmt != 0){
          
          drawACard();

      
      }else{
          //Draw a card, then check if that new card is a match. Should break loop if it is
          //The 20 card limit is just for testing, keeps infinite decks from being made
          while (!(this.playerDeck.playCard(this.playerDeck.amtCards-1)) ){
            drawACard();
          }
      }
      
    }

}

function rotatePlayers() {
    gameTurn = gameTurn + gameDirection;

    if (gameTurn == players.length)
        gameTurn = 0;
    else if (gameTurn < 0)
        gameTurn = players.length - 1;
    
    document.getElementById('playerID').innerHTML = players[gameTurn].playerID;
    players[gameTurn].playerDeck.reloadHand();
    
    
    console.log("rotatePlayers check, player: " + gameTurn);

}

window.onload = initializeWindow();
window.onload = initializePlayers();


function play(){
    setTimeout(function(){ 
        if (players[gameTurn].isBot){
            players[gameTurn].botLogic();
        }
    }, 1000);

}


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


/**
 * Card is wild
 */
function cardWild(){
  console.log("Wild Card!");
    if (players[gameTurn].isBot)
    {
      let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
      let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        
        
        playFieldCard.color = randColor;
        playFieldCard.value = -1;
        
        //Get div elements that will be changed in HTML
        let divColor = document.getElementById('PlayfieldCardColor');
        let divValue = document.getElementById('PlayfieldCardValue');
        //Change innter HTML to match new global card values
        divColor.innerHTML = playFieldCard.color;
        divValue.innerHTML = playFieldCard.value;
     
    }
    else {
    
        let isColorSelected = false;
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
          isColorSelected = true;
          rotatePlayers();
          play();
        };
        gameTurn = gameTurn - gameDirection;
    }
    return true;
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
    cardWild(); 
}

