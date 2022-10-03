//just some variables required to make the game functional
var MAX_GUESSES = 6;
var guessCount = MAX_GUESSES;
var word = "";
var completeWord = "";
var guesses = "";
var incorrectGuesses = "";
var firstGame = new Boolean(true);
var gameFinished = new Boolean(false);


//starting game and splashscreen variables
var splashscreen = document.getElementById("splashscreen");
var gamePage = document.getElementById("game-page");

splashscreen.addEventListener("click", function() {
	splashscreen.style.display = "none";
	gamePage.style.display = "block";
	startNewGame();
});

//updates the letters guessed and the image present
function updatePage() {
	var letterString = "";
	for (var i = 0; i < word.length; i++) {
		var letter = word.charAt(i);
		if(guesses.indexOf(letter) >= 0) {
			letterString += letter + " ";
		} else {
			letterString += "_ ";
		}		
	}

	// section of page that holds either win/loss text or failed letter guesses
	var guessArea = document.getElementById("guessArea"); 

	//update hangman image
	var hangmanImage = document.getElementById("hangmanpic");

	//updates letters "_ _ _ _ _"
	var letters = document.getElementById("letter-spaces");

	//checks to see if game is lost or won
	if (guessCount <= 0) {
		guessArea.innerHTML = "You lose. Click New Game to play again.";
		hangmanImage.src = "img/hangman0.png";
		letters.innerHTML = completeWord;
		gameFinished = true;
	} else if (letterString.indexOf("_") < 0) {
		guessArea.innerHTML = "You win!!!";
		letters.innerHTML = letterString;
		gameFinished = true;
	} else {
		letters.innerHTML = letterString;
		guessArea.innerHTML = "Incorrect Guesses: " + incorrectGuesses;
		hangmanImage.src = "img/hangman" + guessCount + ".png";
	}
	
	var guessValueReset = document.getElementById("guess");
	guessValueReset.value = "";
	
	document.getElementById("guess").focus();
	
}

//cleans up startNewGame function
function whenNewGameStarts() {
	guessCount = MAX_GUESSES;
	guesses = "";
	incorrectGuesses = "";
	var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
	word = POSSIBLE_WORDS[randomIndex];
	completeWord = "";

	//sets completeWord for if player loses
	for (var i = 0; i < word.length; i++) {
		var letter = word.charAt(i);
		completeWord += letter + " ";
	}
	updatePage();
}

//button that starts new game
function startNewGame() {
	if (firstGame == false && gameFinished == false) {
		if (!(guessCount <= 0)) {
			if (confirm("Are you sure to start a New Game? You have more guesses left.")) {
				whenNewGameStarts();
			} else {
				return;
			}
		} else {
			whenNewGameStarts();
		}
	} else {
		firstGame = false;
		gameFinished = false;
		whenNewGameStarts();
	}
}

//button that guesses new letter
function guessLetter() {
	if (firstGame == false) {
		var input = document.getElementById("guess");
		var letter = input.value;

		//checks if the letter has already been inputted
		var inputDoesNotExistYet = new Boolean(true);
		if (guesses.indexOf(letter) < 0) {
			inputDoesNotExistYet = false;
		}
		if (inputDoesNotExistYet == false) {
			guesses += letter;
			//splits all guesses from guesses that are incorrect
			if (word.indexOf(letter) < 0) {
				incorrectGuesses += letter;
			}
			inputDoesNotExistYet = false;
			//subtracts from guesses left if guessed letter isn't in the word
			if (word.indexOf(letter) < 0) {
				if (guessCount >= 0) {
					guessCount--;
				}
			}
		}
		
		updatePage();
	}
}


//modal controls
