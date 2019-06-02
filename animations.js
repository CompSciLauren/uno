/**
 * Animates the action of drawing a card from the playfield deck
 * @param {*} thisHandId the player's hand
 * @param {*} randValue the card value
 * @param {*} randColor the card color
 * @param {*} thisObject the deck
 */
function drawCardAnimation(thisHandId, randValue, randColor, thisObject) {
    // obtain drawPile div
    let drawPile = document.getElementById("drawCardPile");

    // create containers for the cards and add class
    let drawCardContainer = document.createElement("div");
    let drawCardContainerBack = document.createElement("div");
    drawCardContainer.classList.add("drawCardContainer");
    drawCardContainerBack.classList.add("drawCardContainer");

    // append containers to drawpile div
    drawPile.append(drawCardContainer);
    drawPile.append(drawCardContainerBack);

    // create card visuals
    let cardDivBack = document.createElement("div");
    let cardDiv = document.createElement("div");

    // append cards into containers
    drawCardContainer.append(cardDiv);
    drawCardContainerBack.append(cardDivBack);

    //add class card to card divs
    cardDiv.classList.add("card");
    cardDivBack.classList.add("card");

    // create the inside of the cards
    let cardSpan = document.createElement("span");
    cardDiv.append(cardSpan);
    cardSpan.classList.add("inner");

    let cardSpanInner = document.createElement("span");
    cardSpan.append(cardSpanInner);
    cardSpanInner.classList.add("mark");

    let cardSpanBack = document.createElement("span");
    cardDivBack.append(cardSpanBack);
    cardSpanBack.classList.add("inner");

    let cardSpanInnerBack = document.createElement("span");
    cardSpanBack.append(cardSpanInnerBack);
    cardSpanInnerBack.classList.add("mark");

    cardDiv.append();
    cardDivBack.append();

    addCSSDesignToBackOfCard(cardDivBack, cardSpanInnerBack);

    if (thisHandId == "BottomSeat") {
        addCSSDesignToCard(cardDiv, cardSpanInner, randValue);

        // determines color of card drawn from the playfield deck
        switch (randColor) {
            case "Blue":
                cardDiv.classList.add("blue");
                break;
            case "Red":
                cardDiv.classList.add("red");
                break;
            case "Green":
                cardDiv.classList.add("green");
                break;
            case "Yellow":
                cardDiv.classList.add("yellow");
                break;
        }

        drawCardContainer.classList.add("drawCardAnimationFrontDown");
        drawCardContainerBack.classList.add("drawCardAnimationBack");
    } else {
        addCSSDesignToBackOfCard(cardDiv, cardSpanInner);

        if (thisHandId == "TopSeat") {
            drawCardContainer.classList.add("drawCardAnimationHiddenUp");
        } else if (thisHandId == "RightSeat") {
            drawCardContainer.classList.add("drawCardAnimationHiddenRight");
        } else if (thisHandId == "LeftSeat") {
            drawCardContainer.classList.add("drawCardAnimationHiddenLeft");
        } else {
            drawCardContainer.classList.add("drawCardAnimationFront");
        }
        drawCardContainerBack.classList.add("drawCardBackHidden");
    }

    setTimeout(function () {
        drawPile.removeChild(drawPile.childNodes[0]);
        drawPile.removeChild(drawPile.childNodes[0]);
        thisObject.reloadHand();
    }, 1000);
}
