//just some variables required to make the game functional
// var firstGame = new Boolean(true);
// var gameFinished = new Boolean(false);
var maxZ = 1000;
var topTimes = [7.035, 7.194, 7.221, 0.234, 7.254, 7.523, 7.809, 8.247, 8.268, 9.427];
var startTime, endTime;
var boxCount;			//sets a set number of boxes in startNewGame function
var firstClick = new Boolean(true);
var latestTime;

window.onload = function() {
	var start = document.getElementById("add").addEventListener("click", startNewGame);
	displayTopTimes();


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
	//gets rid of any boxes if new game is started before all boxes are gone
	boxArea.innerHTML = "";
	boxCount = parseInt(Math.random() * 5) + 15; 		//sets random number of boxes from in a range from 5 - 10
	for(var i = 0; i < boxCount; i++) {
		var box = document.createElement("div"); 		//creates a new box
		box.className = "box";
		box.style.left = 2 + parseInt(Math.random() * 646) + "px";
		box.style.top = 2 + parseInt(Math.random() * 246) + "px";
		box.style.backgroundColor = getRandomColor();
		box.addEventListener("mouseup", boxClick);
		boxArea.appendChild(box);
	}

	firstClick = true;
}

function boxClick() {
	//start timer
	if (firstClick) {
		startTime = performance.now();
		firstClick = false;
	}

	//delete boxes as they are clicked and change the amount of boxes left
	this.parentNode.removeChild(this);
	boxCount--;

	//stop timer
	if (boxCount <= 0) {
		endTime = performance.now();
		var timeDiff = endTime - startTime; //in ms 
		//get seconds 
		var timeSeconds = timeDiff/1000;
		console.log(timeSeconds.toFixed(3) + " seconds");
		latestTime = timeSeconds;
		displayTopTimes();
	}
}

//checks to see if the latest time is faster than the slowest one on record
function fastestTimes() {
	if (latestTime < topTimes[topTimes.length - 1]) {
		topTimes.pop();				//gets rid of the slowest time
		topTimes.push(latestTime);	//adds the new faster time to the end
	}
	//sorts the times from fastest to slowest
	topTimes.sort(function(a, b){return a -b});
}

//displays times to the screen
function displayTopTimes() {
	//runs fastestTimes(); to make sure the times are sorted from fastest to slowest
	fastestTimes();
	var displaytoptimes = document.getElementById("topTimesForNow");
	var toDisplay = "";
	displaytoptimes.innerHTML = topTimes;
	for(var i = 0; i < topTimes.length; i++) {
		if (i == 0) {
			toDisplay += (i + 1) + "st place: " + topTimes[i].toFixed(3) + "<br/>" ;
		}
		else if (i == 1) {
			toDisplay += (i + 1) + "nd place: " + topTimes[i].toFixed(3) + "<br/>" ;
		}
		else if (i == 2) {
			toDisplay += (i + 1) + "rd place: " + topTimes[i].toFixed(3) + "<br/>" ;
		} else {
			toDisplay += (i + 1) + "th place: " + topTimes[i].toFixed(3) + "<br/>" ;
		}
	}
	//prints out the scores so the <span> in index.html
	displaytoptimes.innerHTML = toDisplay;
}