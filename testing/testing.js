//All tests
function allTests() {
  console.log("$ Running all tests");
  let indexTestNum = indexTests(); //teting index.js functions
  let cardsTestNum = cardsTests(); //teting index.js functions

  let totalTests = indexTestNum + cardsTestNum;
  console.log(
    "\n$ ~ ~ ~ ~ Testing Summary ~ ~ ~ ~\n$ All ran tests for Uno game project - 13. Passed: " +
    totalTests +
    ". Failed: " +
    (13 - totalTests)
  );
}

//Tests ordered by file
function indexTests() {
  let startTestNum = startGameTests(); //testing the startGame function
  let callUnoTestNum = callUnoTests(); //testing the callUno function
  let cheatTestNum = cheatTests();
  console.log("\n$ * * * * All tests for index.js * * * *");
  console.log(
    "$ Total tests for start() - 3. Passed: " +
    startTestNum +
    ". Failed: " +
    (3 - startTestNum)
  );
  console.log(
    "$ Total tests for callUno() - 2. Passed: " +
    callUnoTestNum +
    ". Failed: " +
    (2 - callUnoTestNum)
  );
  console.log(
    "$ Total tests for all cheats - 4. Passed: " +
    cheatTestNum +
    ". Failed: " +
    (4 - cheatTestNum)
  );
  console.log("\n$ * * * * End tests for index.js * * * *");
  return startTestNum + callUnoTestNum + cheatTestNum;
}

function cardsTests() {
  let isValidNum = isValidTests(); //testing the isValid function
  let playCardNum = playCardTests(); //testing the playCard function

  console.log("\n$ * * * * All tests for cards.js * * * *");
  console.log(
    "$ Total tests for isValid() - 2. Passed: " +
    isValidNum +
    ". Failed: " +
    (2 - isValidNum)
  );
  console.log(
    "$ Total tests for playCard() - 2. Passed: " +
    playCardNum +
    ". Failed: " +
    (2 - playCardNum)
  );
  console.log("\n$ * * * * End tests for cards.js * * * *");
  return isValidNum + playCardNum;
}

//File-specific tests

//Testing the startGame function
function startGameTests() {
  let test1 = startTest1(); //running function w/o proper input
  let test2 = startTest2(); //running function w/ proper input
  let test3 = startTest3(); //Selecting player number in HTML correctly passes in value
  console.log("\n$ ~~~~~~ startGame() tests ~~~~~~");
  console.log("$ Test 1: No valid name input marks form as invalid");
  if (test1 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~\n     Did you close and reopen the html file?");
  }

  console.log("$ Test 2: Valid name input marks form as valid");
  if (test2 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~\n     Did you close and reopen the html file?");
  }

  console.log(
    "$ Test 3: Selecting player number in HTML correctly passes in value"
  );
  if (test3 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~\n     Did you close and reopen the html file?");
  }
  //return sum of tests. 1 = pass, 0 = fail
  return test1 + test2 + test3;
}

//testing the callUno function
function callUnoTests() {
  let test1 = callUnoTest1(); //Calling uno with more than 2 cards considered invalid
  let test2 = callUnoTest2(); //Calling uno with only 2 cards considered valid
  console.log("\n$ ~~~~~~ callUno() tests ~~~~~~");
  console.log(
    "$ Test 1: Calling uno with more than 2 cards considered invalid"
  );
  if (test1 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }

  console.log("$ Test 2: Calling uno with only 2 cards considered valid");
  if (test2 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }
  //return sum of tests. 1 = pass, 0 = fail
  return test1 + test2;
}

function cheatTests() {
  let test1 = cheatTest1(); //Cheat: newPlayfieldCard(), gives new playfield card
  let test2 = cheatTest2(); //Cheat: giveMeABreak("Color", Value), adds correct card to player's hand
  let test3 = cheatTest3(); //Cheat: forceDraw(number), adds correct number of cards to players hand
  let test4 = cheatTest4(); //Cheat: forceRemove(number), removes correct number of cards to players hand
  console.log("\n$ ~~~~~~ Cheat tests ~~~~~~");
  console.log("$ Test 1: Cheat: newPlayfieldCard(), gives new playfield card");
  console.log(
    "$ ^^ Testing Note ^^: It's possible the new card drawn will match the previous card as card selection is random. May run test multiple times, should be majority passed"
  );
  if (test1 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }

  console.log(
    "$ Test 2: Cheat: giveMeABreak('Color', Value), adds correct card to players hand"
  );
  if (test2 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }

  console.log(
    "$ Test 3: Cheat: forceDraw(number), adds correct number of cards to players hand"
  );
  if (test3 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }

  console.log(
    "$ Test 4: Cheat: forceRemove(number), removes correct number of cards from players hand"
  );
  if (test4 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }
  //return sum of tests. 1 = pass, 0 = fail
  return test1 + test2 + test3 + test4;
}

function isValidTests() {
  let test1 = isValidTest1(); //Test if returns true on valid card
  let test2 = isValidTest1(); //Test if returns false on invalid card

  console.log("\n$ ~~~~~~ isValid tests ~~~~~~");
  console.log(
    "$ Test 1: Checks if valid card played is accepted by discard pile"
  );
  if (test1 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }

  console.log(
    "$ Test 2: Checks if invalid card played is rejected by discard pile"
  );
  if (test2 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }
  //return sum of tests. 1 = pass, 0 = fail
  return test1 + test2;
}

function playCardTests() {
  let test1 = playCardTest1(); //Test if playCard correctly validates and plays a valid card
  let test2 = playCardTest2(); //Test if playCard correctly validates and rejects an invalid card

  console.log("\n$ ~~~~~~ playCard tests ~~~~~~");
  console.log(
    "$ Test 1: Test if playCard correctly validates and plays a valid card"
  );
  if (test1 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }

  console.log(
    "$ Test 2: Test if playCard correctly validates and rejects an invalid card"
  );
  if (test2 == 1) {
    console.log("$ **PASSED**");
  } else {
    console.log("$ ~~FAILED~~");
  }
  //return sum of tests. 1 = pass, 0 = fail
  return test1 + test2;
}

//---------------- Testing functions ----------------
//startGame tests
function startTest1() {
  startGame();

  let name = document.getElementById("playerName");
  let playerNum = document.getElementById("amtPlayers");
  console.log("Amt players: " + playerNum.value);
  console.log("Player name: " + name.value);
  if (name.classList.value == "form-control is-invalid") {
    return true;
  } else {
    return false;
  }
}

function startTest2() {
  document.getElementById("playerName").value = "Test";
  startGame();

  let name = document.getElementById("playerName");
  let playerNum = document.getElementById("amtPlayers");
  console.log("Amt players: " + playerNum.value);
  console.log("Player name: " + name.value);
  if (name.classList.value == "form-control is-invalid") {
    return true;
  } else {
    return false;
  }
}

function startTest3() {
  //Default value: 2;
  startGame();
  let playerNum = document.getElementById("amtPlayers");
  console.log("Amt players: " + playerNum.value);
  if (playerNum.value != 2) {
    return false;
  }
  //Select 3
  playerNum.value = 3;
  console.log("Amt players: " + playerNum.value);
  if (playerNum.value != 3) {
    return false;
  }

  //Select 4
  playerNum.value = 4;
  console.log("Amt players: " + playerNum.value);
  if (playerNum.value != 4) {
    return false;
  }

  //successfully completes all tests
  return true;
}

//unoCall tests

function callUnoTest1() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();
  //Force "Test" player to call Uno
  callUno();
  //Expected: 0 (false)
  if (players[gameTurn].unoCall == 0) {
    return true;
  } else {
    return false;
  }
}

function callUnoTest2() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();
  //Force "Test" player to only have 2 cards
  forceRemove(7);
  //Force "Test" player to call Uno
  callUno();
  //Expected: 1 (true)
  if (players[gameTurn].unoCall == 1) {
    return true;
  } else {
    return false;
  }
}

//cheat tests
function cheatTest1() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();
  //Store value of original playfield card
  let oldPlayfieldCardColor =
    discardPile.cards[discardPile.cards.length - 1].color;
  let oldPlayfieldCardValue =
    discardPile.cards[discardPile.cards.length - 1].value;
  //Run function
  newPlayfieldCard();
  //Compare value of new card to old card
  //Expected: 1 (true)
  if (
    discardPile.cards[discardPile.cards.length - 1].value ==
    oldPlayfieldCardValue &&
    discardPile.cards[discardPile.cards.length - 1].color ==
    oldPlayfieldCardColor
  ) {
    return false;
  } else {
    return true;
  }
}

function cheatTest2() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();
  //Run function, selection Blue 5
  giveMeABreak("Blue", 5);
  //Get value of most recently added card
  let newCardColor =
    players[gameTurn].playerDeck.cards[
      players[gameTurn].playerDeck.cards.length - 1
    ].color;
  let newCardValue =
    players[gameTurn].playerDeck.cards[
      players[gameTurn].playerDeck.cards.length - 1
    ].value;
  //Validate card is in player's hand
  if (newCardColor == "Blue" && newCardValue == 5) {
    return true;
  } else {
    return false;
  }
}

function cheatTest3() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();
  //Run function, starting hand + 5 cards (9 + 5 = 14)
  let initialLength = players[gameTurn].playerDeck.cards.length;
  forceDraw(5);
  let newLength = players[gameTurn].playerDeck.cards.length;

  //Validate the correct number of cards
  if (newLength == initialLength + 5) {
    return true;
  } else {
    return false;
  }
}

function cheatTest4() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();
  //Run function, starting hand minus 3 cards
  let initialLength = players[gameTurn].playerDeck.cards.length;
  forceRemove(3);
  let newLength = players[gameTurn].playerDeck.cards.length;

  //Validate the correct number of cards
  if (newLength == initialLength - 3) {
    return true;
  } else {
    return false;
  }
}

//this.isValid tests
function isValidTest1() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();

  //Store value of playfield card
  let playfieldCardColor =
    discardPile.cards[discardPile.cards.length - 1].color;
  let playfieldCardValue =
    discardPile.cards[discardPile.cards.length - 1].value;

  //add matching card to player's hand
  giveMeABreak(playfieldCardColor, playfieldCardValue);

  //Validate the most recent card is valid. Expected: True
  if (
    players[gameTurn].playerDeck.isValid(
      players[gameTurn].playerDeck.cards.length - 1
    ) == true
  ) {
    return true;
  } else {
    return false;
  }
}

function isValidTest2() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();

  //add non-matching card to player's hand
  giveMeABreak("Orange", 999);

  //Validate the most recent card is valid. Expected: false
  if (
    players[gameTurn].playerDeck.isValid(
      players[gameTurn].playerDeck.cards.length - 1
    ) != true
  ) {
    return true;
  } else {
    return false;
  }
}

//this.playCard tests
function playCardTest1() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();

  //Store value of playfield card
  let playfieldCardColor =
    discardPile.cards[discardPile.cards.length - 1].color;
  let playfieldCardValue =
    discardPile.cards[discardPile.cards.length - 1].value;

  //add matching card to player's hand
  giveMeABreak(playfieldCardColor, playfieldCardValue);

  //Validate the most recent card is valid. Expected: True
  if (
    players[gameTurn].playerDeck.playCard(
      players[gameTurn].playerDeck.cards.length - 1
    ) == true
  ) {
    return true;
  } else {
    return false;
  }
}

function playCardTest2() {
  //Initialize game with valid input
  let name = document.getElementById("playerName");
  name.value = "Test";
  startGame();

  //add non-matching card to player's hand
  drawSpecificCard("Orange", 999);

  //Validate the most recent card is valid. Expected: false
  if (
    players[gameTurn].playerDeck.playCard(
      players[gameTurn].playerDeck.cards.length - 1
    ) != true
  ) {
    return true;
  } else {
    return false;
  }
}
