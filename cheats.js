/**
 * Lists cheat functions in console
 */
function showMeCheats() {
    console.log(
        "newPlayfieldCard() -- Adds a new playfield card to top of stack"
    );
    console.log(" ");

    console.log(
        'giveMeABreak("Color", Value) -- Adds a specific card to player\'s hand'
    );

    console.log("Possible card colors: Red, Green, Blue, Yellow, Special");
    console.log(
        "Possible card values for R-G-B-Y: 0-9, 10 (for draw 2), 11 (for reverse), 12 (for skip)"
    );
    console.log(
        "Possible card values for 'Special': 0 (for Wild), 1 (for Wild + Draw 4)"
    );
    console.log(" ");

    console.log(
        "forceDraw(number) -- Draws specific number of cards from deck and adds to player's hand"
    );
    console.log(" ");

    console.log(
        "forceRemove(number) -- Removes specific number of cards (Must leave 2 or more) from player's hand starting at the leftmost card"
    );
}

/**
 * Gives a new playfield card
 */
function newPlayfieldCard() {
    initializeWindow();
}

/**
 * Gives player a specific number of cards
 */
function forceDraw(numCards) {
    if (numCards > 0) {
        drawManyCard(numCards);
    } else {
        console.log("Invalid number of cards: " + numCards);
    }
}

/**
 * Removes a specific number of cards from players hand
 */
function forceRemove(numCards) {
    if (numCards > 0) {
        removeManyCards(numCards);
    } else {
        console.log("Invalid number of cards: " + numCards);
    }
}

/**
 * Gives player a specific card (input from console)
 */
function giveMeABreak(cardColor, cardValue) {
    if ((cardColor == "Special" && cardValue > 1) || cardValue < 0) {
        console.log("Invalid wild card selection: " + cardColor + " " + cardValue);
        return;
    } else if (cardValue > 12) {
        console.log("Invalid card selection: " + cardColor + " " + cardValue);
        return;
    } else {
        drawSpecificCard(cardColor, cardValue);
    }
}