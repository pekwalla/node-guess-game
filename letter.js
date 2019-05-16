//Letter constructor, 'alphabet" will display an underscore or letter or blank (if the word to be guessed has a space)
//'check' function changes boolean from true to false if guessed correctly
function Letter( alphabet) {
    this. alphabet =  alphabet;
    this.guessed = false;
    this.letterShadow = function() {
        if (this. alphabet === " ") {
            return " ";
        }
        else if(!this.guessed) {
            return "_";
        }
        else {
            return this. alphabet;
        }
    }
    this.check = function(userGuess) {
        if (userGuess === this. alphabet) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;
