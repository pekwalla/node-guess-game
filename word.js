var Letter = require("./letter.js");

function Word(wordArr) {
    this.wordArr = wordArr;
    this.tempWord = [];
    this.makeWord = function() {
        for (var i=0; i<wordArr.length; i++) {
            var let = new Letter(wordArr[i]);
            this. tempWord.push(let);
        }
    }
    this.showWord = function() {
        var wordDisplay = [];
        for (var i=0; i<this. tempWord.length; i++) {
            wordDisplay.push(this. tempWord[i].letterShadow());
        }
        return wordDisplay.join(" ");
    }
    this.checkGuess = function(myGuess) {
        for (var i=0; i<this. tempWord.length; i++) {
            this. tempWord[i].check(myGuess);
        }
    }
}

module.exports = Word;