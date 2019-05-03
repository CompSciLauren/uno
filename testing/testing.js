function allTests()
{
    console.log("Running all tests");
    indexTests();   //teting index.js functions
}

function indexTests()
{
    startGameTests();   //testing the startGame function
}

function startGameTests()
{
    let test1 = startTest1();   //first test, running function w/o proper input
    console.log ("Test 1: No valid input (name/players) for starting does not run");
    if (test1 = 0)
    {
        console.log("**PASSED**");
    }else
    {
        console.log("~~FAILED~~");
    }

}

function startTest1()
{
    let playerNameInput = document.getElementById("playerName").value;
    let playerNum = document.getElementById("amtPlayers").value;
    console.log("Amt players: " + playerNum)
    console.log("Player name: " + playerNameInput)

    startGame();

    return true;
}