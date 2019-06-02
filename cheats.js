/**
 * Lists cheat functions in console
 */
function showMeCheats() {
    console.log("------------------------------------");
    console.log("newPlayfieldCard() -- Add new card to the discard pile");
    console.log("");

    console.log('drawSpecificCard("Color", Value) -- Give yourself a specific card');

    console.log("COLOR OPTIONS: Red, Green, Blue, Yellow, Special");
    console.log("VALUE OPTIONS for R-G-B-Y: 0-9, 10 (for draw 2), 11 (for reverse), 12 (for skip)");
    console.log("VALUE OPTIONS for 'Special': 13 for Wild, 14 for Wild Draw 4");
    console.log("");

    console.log("forceAdd(number) -- Give yourself any number of cards");
    console.log("");

    console.log("forceRemove(number) -- Remove any number of cards from your hand starting from left side");
    console.log("NOTE: Must leave at least 2 cards in hand");
    console.log("------------------------------------");
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
function forceAdd(numCards) {
    if (numCards > 0) {
        drawCards(numCards);
    } else {
        console.log("Invalid number of cards: " + numCards);
    }
}

/**
 * Draws a specific number of cards and adds them to player's hand
 */
function drawCards(numCards) {
    for (let i = 0; i < numCards; i++) {
        players[gameTurn].playerDeck.drawCard();
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
function drawSpecificCard(cardColor, cardValue) {
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
