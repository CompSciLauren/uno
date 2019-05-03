function allTests()
{
    console.log("Running all tests");
    indexTests();   //teting index.js functions
}

function indexTests()
{
    //let startTestNum = startGameTests();   //testing the startGame function
    let callUnoTestNum = callUnoTests();    //testing the callUno function
    //console.log("Total tests for start() - 3. Passed: " + startTestNum + ". Failed: " + (3 - startTestNum));
    console.log("Total tests for callUno() - 2. Passed: " + callUnoTestNum + ". Failed: " + (2 - callUnoTestNum));

}

//Testing the startGame function
function startGameTests()
{
    let test1 = startTest1();   //running function w/o proper input
    let test2 = startTest2();   //running function w/ proper input
    let test3 = startTest3();   //Selecting player number in HTML correctly passes in value
    console.log("~~~~~~ startGame() tests ~~~~~~");
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
    console.log("~~~~~~ callUno() tests ~~~~~~");
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


//---------------- Testing functions ----------------
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