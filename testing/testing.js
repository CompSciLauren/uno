function allTests()
{
    console.log("Running all tests");
    let indexTestNum = indexTests();   //teting index.js functions

    let totalTests = indexTestNum;
    console.log("\n~ ~ ~ ~ Testing Summary ~ ~ ~ ~\nAll ran tests for Uno game project - 999. Passed: " 
                        + totalTests + ". Failed: " + (999 - totalTests));
}

function indexTests()
{
    // let startTestNum = startGameTests();   //testing the startGame function
    // let callUnoTestNum = callUnoTests();    //testing the callUno function
    let cheatTestNum = cheatTests();
    console.log("\n* * * * All tests for index.js * * * *");
    // console.log("Total tests for start() - 3. Passed: " + startTestNum + ". Failed: " + (3 - startTestNum));
    // console.log("Total tests for callUno() - 2. Passed: " + callUnoTestNum + ". Failed: " + (2 - callUnoTestNum));
    console.log("Total tests for all cheats - 2. Passed: " + cheatTestNum + ". Failed: " + (2 - cheatTestNum));
    return 666;
}

//Testing the startGame function
function startGameTests()
{
    let test1 = startTest1();   //running function w/o proper input
    let test2 = startTest2();   //running function w/ proper input
    let test3 = startTest3();   //Selecting player number in HTML correctly passes in value
    console.log("\n~~~~~~ startGame() tests ~~~~~~");
    console.log ("Test 1: No valid name input marks form as invalid");
    if (test1 == 1)
    {
        console.log("**PASSED**");
    }else
    {
        console.log("~~FAILED~~");
    }

    console.log ("Test 2: Valid name input marks form as valid");
    if (test2 == 1)
    {
        console.log("**PASSED**");
    }else
    {
        console.log("~~FAILED~~");
    }

    console.log ("Test 3: Selecting player number in HTML correctly passes in value");
    if (test3 == 1)
    {
        console.log("**PASSED**");
    }else
    {
        console.log("~~FAILED~~");
    }
    //return sum of tests. 1 = pass, 0 = fail
    return (test1 + test2 + test3);
}

//testing the callUno function
function callUnoTests()
{
    let test1 = callUnoTest1();   //Calling uno with more than 2 cards considered invalid
    let test2 = callUnoTest2();   //Calling uno with only 2 cards considered valid
    console.log("\n~~~~~~ callUno() tests ~~~~~~");
    console.log ("Test 1: Calling uno with more than 2 cards considered invalid");
    if (test1 == 1)
    {
        console.log("**PASSED**");
    }else
    {
        console.log("~~FAILED~~");
    }

    console.log ("Test 2: Calling uno with only 2 cards considered valid");
    if (test2 == 1)
    {
        console.log("**PASSED**");
    }else
    {
        console.log("~~FAILED~~");
    }
    //return sum of tests. 1 = pass, 0 = fail
    return (test1 + test2);
}

function cheatTests()
{
    let test1 = cheatTest1();   //Cheat: newPlayfieldCard(), gives new playfield card
    //let test2 = cheatTest2();   //Cheat: giveMeABreak("Color", Value), adds correct card to player's hand
    //let test3 = cheatTest3();   //Cheat: forceDraw(number), adds correct number of cards to players hand
    //let test4 = cheatTest4();   //Cheat: forceRemove(number), removes correct number of cards to players hand
    console.log("\n~~~~~~ Cheat tests ~~~~~~");
    console.log ("Test 1: Cheat: newPlayfieldCard(), gives new playfield card");
    console.log("*** Testing Note: It's possible the new card drawn will match the previous card as card selection is random. May run test multiple times, should be majority passed")
    if (test1 == 1)
    {
        console.log("**PASSED**");
    }else
    {
        console.log("~~FAILED~~");
    }
    //return sum of tests. 1 = pass, 0 = fail
    return (test1);
}


//---------------- Testing functions ----------------
//startGame tests
function startTest1()
{
    startGame();

    let name = document.getElementById("playerName");
    let playerNum = document.getElementById("amtPlayers");
    console.log("Amt players: " + playerNum.value);
    console.log("Player name: " + name.value);
    if (name.classList.value == "form-control is-invalid")
    {
        return true;
    }else
    {
        return false;
    }
}

function startTest2()
{
    document.getElementById("playerName").value = "Test";
    startGame();

    let name = document.getElementById("playerName");
    let playerNum = document.getElementById("amtPlayers");
    console.log("Amt players: " + playerNum.value);
    console.log("Player name: " + name.value);
    if (name.classList.value == "form-control is-invalid")
    {
        return true;
    }else
    {
        return false;
    }
}

function startTest3()
{
    //Default value: 2;
    startGame();
    let playerNum = document.getElementById("amtPlayers");
    console.log("Amt players: " + playerNum.value);
    if (playerNum.value != 2)
    {
        return false;
    }
    //Select 3
    playerNum.value = 3;
    console.log("Amt players: " + playerNum.value);
    if (playerNum.value != 3)
    {
        return false;
    }

    //Select 4
    playerNum.value = 4;
    console.log("Amt players: " + playerNum.value);
    if (playerNum.value != 4)
    {
        return false;
    }

    //successfully completes all tests
    return true;
}

//unoCall tests

function callUnoTest1()
{
    //Initialize game with valid input
    let name = document.getElementById("playerName");
    name.value = "Test"
    startGame();
    //Force "Test" player to call Uno
    callUno();
    //Expected: 0 (false)
    if (players[gameTurn].unoCall == 0)
    {
        return true;
    }else
    {
        return false;
    }
}

function callUnoTest2()
{
    //Initialize game with valid input
    let name = document.getElementById("playerName");
    name.value = "Test"
    startGame();
    //Force "Test" player to only have 2 cards
    forceRemove(7);
    //Force "Test" player to call Uno
    callUno();
    //Expected: 1 (true)
    if (players[gameTurn].unoCall == 1)
    {
        return true;
    }else
    {
        return false;
    }

}

//cheat tests
function cheatTest1()
{
    //Initialize game with valid input
    let name = document.getElementById("playerName");
    name.value = "Test"
    startGame();
    //Store value of original playfield card
    let oldPlayfieldCardColor = discardPile.cards[discardPile.cards.length - 1].color;
    let oldPlayfieldCardValue = discardPile.cards[discardPile.cards.length - 1].value;
    //Run function
    newPlayfieldCard();
    //Compare value of new card to old card
    //Expected: 1 (true)
    if (discardPile.cards[discardPile.cards.length - 1].value == oldPlayfieldCardValue && discardPile.cards[discardPile.cards.length - 1].color == oldPlayfieldCardColor)
    {
        return false;
    }else
    {
        return true;
    }

}