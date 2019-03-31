/*
Author: Eric Seitz
KUID: 2928468
Assignment: Project 3
Date: Mar 28 2019
Class: EECS 448
*/

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
        let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
        let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        let randValue = Math.floor((Math.random() * 10));
        let tempCard = new card(randColor,randValue);
        this.addCard(tempCard);
        this.reloadHand();
    };
    
    //removes card from hand and reloads hand
    this.playCard = function(c){
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
}

// Global Playfield Card
let playFieldCard;


//Testing function, compare object to playfield object
function checkPlayerCardToPlayfield()
{
    //Get in the value by element ID
    let cardColor = document.getElementById("cardColor").value;
    let cardNumber = document.getElementById("cardNumber").value;

    if (cardColor != playFieldCard.color)
    {
        alert("Card color: " + cardColor + ". Card Number: " + cardNumber + "\nCards have different color.");
        return;
    }
    if (cardNumber != playFieldCard.value)
    {
        alert("Card color: " + cardColor + ". Card Number: " + cardNumber + "\nCards have different value.");
        return;
    }

    alert("Card color: " + cardColor + ". Card Number: " + cardNumber + "\nCards match");
    return;
}//end of checkPassword



//Testing function, plays a card
function useCard()
{
    //Get in the value by element ID
    let cardIndex = document.getElementById("cardIndex").value;

    myDeck.playCard(cardIndex);
}



//Changes the global card object to random color/value assignment
function SelectPlayfieldCard()
{
    let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
    let hexColor = ['#a60000', '#004F19', '#2C0066']
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
    
    //Creates a deck for player
    myDeck = new deck;
    
    //Automatically gives the player 7 cards
    let i = 0;
    for(i = 0; i< 7; i++){myDeck.drawCard();}
    
    //For Testing. console logs the full player hand
    myDeck.showDeck();

}

window.onload = initializeWindow();