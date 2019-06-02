/**
 * Adds classes to create the CSS design for the back of the Uno cards
 * @param {*} cardDiv
 * @param {*} cardSpanInner
 */
function addCSSDesignToBackOfCard(cardDiv, cardSpanInner) {
    cardDiv.classList.add("black");
    cardSpanInner.append("_");
    $(cardSpanInner).css("color", "#c72a18");
    $(cardSpanInner).css("background-color", "#c72a18");
    $(cardSpanInner).css("text-shadow", "#c72a18 1px 1px 1px");
}

/**
 * Adds classes to create the CSS design for the front of the Uno cards
 * @param {*} cardDiv 
 * @param {*} cardSpanInner 
 * @param {*} cardValue 
 */
function addCSSDesignToCard(cardDiv, cardSpanInner, cardValue) {
    switch (cardValue) {
        case 0:
            cardDiv.classList.add("num-0");
            cardSpanInner.append("0");
            break;
        case 1:
            cardDiv.classList.add("num-1");
            cardSpanInner.append("1");
            break;
        case 2:
            cardDiv.classList.add("num-2");
            cardSpanInner.append("2");
            break;
        case 3:
            cardDiv.classList.add("num-3");
            cardSpanInner.append("3");
            break;
        case 4:
            cardDiv.classList.add("num-4");
            cardSpanInner.append("4");
            break;
        case 5:
            cardDiv.classList.add("num-5");
            cardSpanInner.append("5");
            break;
        case 6:
            cardDiv.classList.add("num-6");
            cardSpanInner.append("6");
            break;
        case 7:
            cardDiv.classList.add("num-7");
            cardSpanInner.append("7");
            break;
        case 8:
            cardDiv.classList.add("num-8");
            cardSpanInner.append("8");
            break;
        case 9:
            cardDiv.classList.add("num-9");
            cardSpanInner.append("9");
            break;
        case 10:
            cardDiv.classList.add("draw2");
            cardSpanInner.append("_");
            $(cardSpanInner).css("color", "white");
            $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

            // first inner card drawing
            let specialClassDiv = document.createElement("div");
            cardSpanInner.append(specialClassDiv);
            specialClassDiv.classList.add("cardsInInnerPlus2");
            specialClassDiv.classList.add("card-plus2-bottom-left");

            let evenInnerSpan = document.createElement("span");
            specialClassDiv.append(evenInnerSpan);
            evenInnerSpan.classList.add("inner");

            // second inner card drawing
            let specialClassDiv2 = document.createElement("div");
            cardSpanInner.append(specialClassDiv2);
            specialClassDiv2.classList.add("cardsInInnerPlus2");
            specialClassDiv2.classList.add("card-plus2-top-right");

            let evenInnerSpan2 = document.createElement("span");
            specialClassDiv2.append(evenInnerSpan2);
            evenInnerSpan2.classList.add("inner");

            break;
        case 11:
            cardDiv.classList.add("reverse");
            cardSpanInner.append("⇄");
            break;
        case 12:
            cardDiv.classList.add("skip");
            cardSpanInner.append("⊘");
            break;
        case 13:
            cardDiv.classList.add("wild");
            cardDiv.classList.add("black");
            cardSpanInner.append("_");
            $(cardSpanInner).css("color", "white");
            $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

            // div circle container
            let specialClassDiv9 = document.createElement("div");
            cardSpanInner.append(specialClassDiv9);
            specialClassDiv9.classList.add("circle-container");

            // stuff in container
            let yinnerSpecialClassDiv1 = document.createElement("div");
            specialClassDiv9.append(yinnerSpecialClassDiv1);
            yinnerSpecialClassDiv1.classList.add("quarter");
            yinnerSpecialClassDiv1.classList.add("top-left");

            let yinnerSpecialClassDiv2 = document.createElement("div");
            specialClassDiv9.append(yinnerSpecialClassDiv2);
            yinnerSpecialClassDiv2.classList.add("quarter");
            yinnerSpecialClassDiv2.classList.add("top-right");

            let yinnerSpecialClassDiv3 = document.createElement("div");
            specialClassDiv9.append(yinnerSpecialClassDiv3);
            yinnerSpecialClassDiv3.classList.add("quarter");
            yinnerSpecialClassDiv3.classList.add("bottom-left");

            let yinnerSpecialClassDiv4 = document.createElement("div");
            specialClassDiv9.append(yinnerSpecialClassDiv4);
            yinnerSpecialClassDiv4.classList.add("quarter");
            yinnerSpecialClassDiv4.classList.add("bottom-right");

            // span inner
            let zabevenInnerSpan = document.createElement("span");
            specialClassDiv9.append(zabevenInnerSpan);
            zabevenInnerSpan.classList.add("inner");
            break;
        case 14:
            cardDiv.classList.add("plus-4");
            cardDiv.classList.add("black");
            cardSpanInner.append("_");
            $(cardSpanInner).css("color", "white");
            $(cardSpanInner).css("text-shadow", "#fff 1px 1px 1px");

            // div card green
            let specialClassDiv19 = document.createElement("div");
            cardSpanInner.append(specialClassDiv19);
            specialClassDiv19.classList.add("cardsInInnerPlus4");
            specialClassDiv19.classList.add("card-plus4-green");
            specialClassDiv19.classList.add("green");

            let evenInnerSpan1 = document.createElement("span");
            specialClassDiv19.append(evenInnerSpan1);
            evenInnerSpan1.classList.add("inner");

            // div card blue
            let specialClassDiv192 = document.createElement("div");
            cardSpanInner.append(specialClassDiv192);
            specialClassDiv192.classList.add("cardsInInnerPlus4");
            specialClassDiv192.classList.add("card-plus4-blue");
            specialClassDiv192.classList.add("blue");

            let evenInnerSpan12 = document.createElement("span");
            specialClassDiv192.append(evenInnerSpan12);
            evenInnerSpan12.classList.add("inner");

            // div card red
            let specialClassDiv193 = document.createElement("div");
            cardSpanInner.append(specialClassDiv193);
            specialClassDiv193.classList.add("cardsInInnerPlus4");
            specialClassDiv193.classList.add("card-plus4-red");
            specialClassDiv193.classList.add("red");

            let evenInnerSpan13 = document.createElement("span");
            specialClassDiv193.append(evenInnerSpan13);
            evenInnerSpan13.classList.add("inner");

            // div card yellow
            let specialClassDiv194 = document.createElement("div");
            cardSpanInner.append(specialClassDiv194);
            specialClassDiv194.classList.add("cardsInInnerPlus4");
            specialClassDiv194.classList.add("card-plus4-yellow");
            specialClassDiv194.classList.add("yellow");

            let evenInnerSpan14 = document.createElement("span");
            specialClassDiv194.append(evenInnerSpan14);
            evenInnerSpan14.classList.add("inner");
            break;
    }
}
