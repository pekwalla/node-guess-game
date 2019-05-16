//NPM modules to obtain player input (letter guesses) and to add color to the display
var Word = require("./word.js");
var inquirer = require('inquirer');
var colors = require('colors');

wordList = ["KNIFE", "SPOON", "FORK", "NAPKIN", "", "LADLES", "SPIDER", "KITCHEN SCRAPERS", "TONGS", "PEELER", "PIZZA CUTTERS", "GARLIC PRESSER", "WHISKS", "KNIFE"];
var selection = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

//Chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'chosenWord' is used for comparison later to check if the word is solved
function startGame() {

    if (wordList.length<2) {
        //wordList = ["KNIFE", "SPOON", "FORK", "NAPKIN", "", "LADLES", "SPIDER", "KITCHEN SCRAPERS", "TONGS", "PEELER", "PIZZA CUTTERS", "GARLIC PRESSER", "WHISKS", "KNIFE"];
    }
    selection= Math.floor(Math.random()*wordList.length);
    chosenWord = wordList[selection];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (selection> -1) {
        wordList.splice(selection, 1);
    }
    console.log("\nYou get 8 letter guesses to Kitchen Item.\n".cyan)
    promptUser();
    
}

//Allows the user to input a letter guess, restarts the game if player is out of wrong guesses.
function promptUser() {
    if (counter<8) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. ".cyan
            }
        ]).then(function(data) {
                checkAnswer(data);
        });
    }
    else{
        console.log("\nSorry, you're out of guesses.\n".inverse);
        console.log(chosenWord.rainbow);
        chosenWord = "";
        gameWord = "";
        selection= 0;
        counter = 0;
        init();
       // startGame();
    }
}

//checks that the user's input is in correct format and compares the letter to gameWord to see if guess is correct
//Check if there is a letter: yourString.matches(".*[a-zA-Z].*")
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n".yellow);
            counter++;
            console.log(((8 - counter) + " guesses remaining").white);
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n".white);
        promptUser();
    }
}

//If the user's guess is correct, the word array displays the word with the guessed letter(s), 
//If the entire word is correct (filled in), the game restarts.
function rightGuess() {
    console.log("\nYou guessed correctly.\n".green);
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord().bgBlue);
        console.log('\nYou win!!\n'.bgBlue);
        chosenWord = "";
        gameWord = "";
        selection= 0;
        counter = 0;
        init();
       // startGame();
      

    }
    
     else {
        
        promptUser();
    } 
  
}




function init () { 

 
inquirer.prompt([
    {
        type: "input",
        name: "letter1",
        message: "\n Do you want to continue".bgRed
        
    }
    
]).then(function(data1) {
    
        checkInit(data1);
});
}

function checkInit(data1) {
    
    
    if ((data1.letter1 == "Y") || (data1.letter1 == "y")) {
       
        console.log ("Start loading Game....");
        startGame();
     
    }
    
    else if ((data1.letter1 == "N") || (data1.letter1 == "n"))  {
        console.log ("loading. Exiting the Game....");
        //process.exit(1);
        
    }
}
init();