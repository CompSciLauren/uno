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
    this.addCard = function(c){
        this.cards.push(c);
        this.amtCards = this.cards.length;
    };
    
    this.removeCard = function(c){
        this.cards.splice(c, 1);
        this.amtCards = this.cards.length;
    };
    
    this.getCard = function(c){
        return(this.cards[c]);
    };
    
    this.showDeck = function(){     //For Testing
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


//Changes the global card object to random color/value assignment
function SelectPlayfieldCard()
{
    let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
    let hexColor = ['#a60000', '#004F19', '#2C0066']
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    let randValue = Math.floor((Math.random() * 10));
    playFieldCard = new card(randColor,randValue);
}

//Reloads the player hand to have the most recent cards in player hand
function reloadHand(){
    let hand = document.getElementById('playerHand');
    hand.innerHTML = "";
    for( i = 0; i < myDeck.cards.length; i++){
        let cardDiv = document.createElement('div');
        hand.append(cardDiv);
        cardDiv.innerHTML = myDeck.getCard(i).value;
        cardDiv.classList.add('card');
        cardDiv.style.backgroundColor = myDeck.getCard(i).getColorValue();
    }
}

// Gives player a random card
function getCard(){
        let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];
        let hexColor = ['#a60000', '#004F19', '#2C0066']
        let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        let randValue = Math.floor((Math.random() * 10));
        let tempCard = new card(randColor,randValue);
        console.log(randColor + " " + randValue);
        myDeck.addCard(tempCard);
        reloadHand();
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
    for(i= 0; i< 7; i++){getCard();}
    
    //For Testing. console logs the full player hand
    myDeck.showDeck();

}

window.onload = initializeWindow();