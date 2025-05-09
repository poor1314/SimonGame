// === Configuration ===
const availableColors = ["red", "blue", "green", "yellow"];

// === Sound Assets ===
const blueSound = new Audio('/sounds/blue.mp3');
const greenSound = new Audio("/sounds/green.mp3");
const redSound = new Audio("/sounds/red.mp3"); 
const yellowSound = new Audio("/sounds/yellow.mp3");
const errorSound = new Audio("/sounds/wrong.mp3");

// === Game State ===
const simonSequence = [];
const playerSequence = [];
let currentRound = 1;
let currentStepIndex = 0;
let currentSimonStep = 0;

// === Functions ===
function soundAnnouncement(sound){
    if (sound !== simonSequence[currentStepIndex]) return errorSound.play();
    switch(sound){
        case "red":
            return redSound.play();
        case "blue":
            return blueSound.play();
        case "green":
            return greenSound.play();
        case "yellow":
            return yellowSound.play();
    }
}
// only allow game start when the simon sequence is empty
document.addEventListener("keydown", e =>{
    if (simonSequence.length === 0 ) gameStart(e);
});

document.addEventListener("click", e => {
    handleGameButtonClick(e);
});

function handleGameButtonClick(e){
    let userColor = e.target.id;
    let currentElement = e.target;
    // only take action on class .btn && when game start where simonSequence's length is >= 1
    if (e.target.classList.contains("btn") && simonSequence.length > 0){
        // change in opacity to show the simon's pattern
        gameEffect(currentElement, "opacityChange", 200);
        comparePlayerAndSimonSequence(userColor, currentElement);
    } 
}

// press space to start a new game
function gameStart(e){
    if(e.key === " "){
        progressSimonSequence();
        showAnnouncement(`Game Start! Current Round:${currentRound}`);
    }
}
// generate between number 0 - 3 
function generateRandomIndex(){
   return Math.floor((Math.random() * 4));
}

// the next simon's sequence is generated randomly and 1 new sequence per game
function progressSimonSequence(){
    simonSequence.push(availableColors[generateRandomIndex()]);
    let color = document.querySelector("." + simonSequence[currentSimonStep]);
    // show the simon's sequence through opacity changes
    gameEffect(color,"opacityChange", 200)
}

// allow customized effect toggle from css
function gameEffect(currentElement, effect, time){
    currentElement.classList.toggle(effect);
    setTimeout(() => {
        currentElement.classList.toggle(effect);
    }, time);
}

// compare player and simon sequence 
function comparePlayerAndSimonSequence(userColor){
    showAnnouncement(`correct`);
    // make sound for player's choice
    if (availableColors.includes(userColor)) soundAnnouncement(userColor);

    // whenever user matches simon's pattern its color will be pushed in an array
    if(userColor === simonSequence[currentStepIndex]){
        playerSequence.push(simonSequence[currentStepIndex]);
        currentStepIndex += 1;
    }
    else{
        showAnnouncement(`Game lost! ${simonSequence[currentStepIndex]}(Simon) vs ${userColor}(you) \n press space to start new game!`);
        resetGameStats();
        
        let bodyElement = document.querySelector("body");
        // make a mistake will turn background into red
        gameEffect(bodyElement, "flashRedBackground", 1000); 
        return;
    }
    // when the size of array becomes 4 is when the game is won
    if(playerSequence.length >= 4){
        playerWonFullGame("Player won! press space to start a new game"); 

    // if size is less than 4, advance to next round with new pattern 
    } else if(simonSequence.length === playerSequence.length){ 
        setTimeout(() => {
            advanceToNextRound();
        }, 500);
    }
}

// reset stats once game has been won
function playerWonFullGame(gameWonText){
    showAnnouncement(gameWonText);
    resetGameStats();
}

function advanceToNextRound(){
    currentSimonStep += 1;
    currentRound += 1;

    // reset these two so that the array push starting at index 0 
    // and empty array to store the match
    // for next round's comparison
    currentStepIndex = 0;
    playerSequence.length = 0;
    showAnnouncement(`Round Won! current round:${currentRound}`);
    progressSimonSequence(currentRound);
}

// full reset upon lose/win
function resetGameStats(){
    currentStepIndex = 0; 
    currentRound = 1; 
    currentSimonStep = 0;
    simonSequence.length = 0; 
    playerSequence.length = 0;
}

function showAnnouncement(gameStatus){
    document.querySelector("h1").textContent = gameStatus;
}
