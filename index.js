/*
Author: Eric Seitz
KUID: 2928468
Assignment: Project 3
Date: Mar 28 2019
Class: EECS 448
*/

//Global card object
let card = {color:"Default", value:"Default"}; 


//Testing function, compare object to playfield object
function checkPlayerCardToPlayfield()
{
    //Get in the value by element ID
    let cardColor = document.getElementById("cardColor").value;
    let cardNumber = document.getElementById("cardNumber").value;

    if (cardColor != card.color)
    {
        alert("Card color: " + cardColor + ". Card Number: " + cardNumber + "\nCards have different color.");
        return;
    }
    if (cardNumber != card.value)
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
    //Selecting random color and value
    let colorArray = ['Red', 'Green', 'Blue', 'Yellow'];    
    let randColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    let randValue = Math.floor((Math.random() * 10));
    //Assign random color and value to global card object
    card.color = randColor;
    card.value = randValue;
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
    divColor.innerHTML = card.color;
    divValue.innerHTML = card.value;

}

window.onload = initializeWindow();