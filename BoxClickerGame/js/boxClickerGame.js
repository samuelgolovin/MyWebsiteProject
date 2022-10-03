//just some variables required to make the game functional
// var firstGame = new Boolean(true);
// var gameFinished = new Boolean(false);

window.onload = function() {
	var start = document.getElementById("add").addEventListener("click", startNewGame);
	



	//starting game and splashscreen variables (bring back start screen after the game is more developed make sure to change the css to splashscreen:flex and game-area:none)
	//var splashscreen = document.getElementById("splashscreen");
	//splashscreen.onclick = startGame;
};

// function startGame() {
// 	var gamePage = document.getElementById("game-page");
// 	splashscreen.style.display = "none";
// 	gamePage.style.display = "block";
// };

//as the name suggests, a random color code "#******" is returned
function getRandomColor() {
	var letters = "0123456789abcdef";
	var result = "#";
	for (var i = 0; i < 6; i++) {
		result += letters.charAt(parseInt(Math.random() * letters.length));
	}
	return result;
}

function startNewGame() {
	//game functions that create boxes at the start of the game
	var boxArea = document.getElementById("boxarea");
	var boxCount = parseInt(Math.random() * 21) + 30; 		//sets random number of boxes from in a range from 5 - 10
	for(var i = 0; i < boxCount; i++) {
		var box = document.createElement("div"); 		//creates a new box
		box.className = "box";
		box.style.left = 2 + parseInt(Math.random() * 646) + "px";
		box.style.top = 2 + parseInt(Math.random() * 246) + "px";
		box.style.backgroundColor = getRandomColor();
		boxArea.appendChild(box);
	}
}