const buttonColors = ["red", "blue", "green", "yellow"];
const simonPattern = [];
const userPattern = [];
let round = 1;
let index = 0; // might need to be naming this
let lastIndex = 0;
const blueButtonSound = new Audio('/sounds/blue.mp3');
const greenButtonSound = new Audio("/sounds/green.mp3");
const redButtonSound = new Audio("/sounds/red.mp3"); 
const yellowButtonSound = new Audio("/sounds/yellow.mp3");
const wrongChoiceSound = new Audio("/sounds/wrong.mp3")

function soundAnnouncement(sound){
    if (sound !== simonPattern[index]) return wrongChoiceSound.play();
    switch(sound){
        case "red":
            return redButtonSound.play();
        case "blue":
            return blueButtonSound.play();
        case "green":
            return greenButtonSound.play();
        case "yellow":
            return yellowButtonSound.play();
    }
}

// start game() by pressing space
document.addEventListener("keydown", e =>{
    if (simonPattern.length === 0 ) gameStart(e);
})
 
// user click on button and should match with the pattern
document.addEventListener("click", e => {
    let userColor = e.target.id;
    let currentElement = e.target
    if (e.target.classList.contains("btn") && simonPattern.length > 0){
        gameEffect(currentElement, "opacityChange", 200);
        compareUserAndSimonPattern(userColor, currentElement);
    } 
    // console.log("simonPattern atClick", simonPattern);
    console.log("userPattern atClick", userPattern);
})

function gameStart(e){
    if(e.key === " "){
        progressSimonPattern(round);
        showAnnouncement(`Game Start! Current Round:${round}`)
    }
}

function indexGenerate(){
   return Math.floor((Math.random() * 4));
}

function progressSimonPattern(){
   
        simonPattern.push(buttonColors[indexGenerate()])
        console.log("index",index);
        console.log("lastIndex",lastIndex);
        
        
        let color = document.querySelector("." + simonPattern[lastIndex]);
        
        delayGameEffect(color);
    console.log("Simon's patten", simonPattern);
}

function delayGameEffect(color){
    setTimeout(function() {
        color.classList.toggle("opacityChange"); 
    }, 200 * (lastIndex + 1));

    setTimeout(function() {
        // console.log(buttonColors[i]);
        color.classList.toggle("opacityChange"); 
    }, 200 * (lastIndex + 2));
}


function gameEffect(currentElement, effect, time){
    currentElement.classList.toggle(effect);
    setTimeout(() => {
        currentElement.classList.toggle(effect);
    }, time);
}

function compareUserAndSimonPattern(userColor){
    showAnnouncement(`correct`)
  
    // play sounds
    if (buttonColors.includes(userColor)) soundAnnouncement(userColor);
   
    if(userColor === simonPattern[index]){
        userPattern.push(simonPattern[index])
        index += 1;
        
    }
    else{
        showAnnouncement(`Game lost! ${simonPattern[index]}(Simon) vs ${userColor}(you) \n press space to start new game!`)
        resetGameStats();
       
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#011F3F";
        }, 200);
        return;
    }

    if(userPattern.length >= 2){
        hasPlayerWonFullGame("Player won! press space to start a new game"); 
    } else if(simonPattern.length === userPattern.length){
        // console.log("round won!");
        advanceToNextRound()
    }
}

function hasPlayerWonFullGame(gameWonText){
    showAnnouncement(gameWonText);
    resetGameStats();
}

function advanceToNextRound(){
    lastIndex += 1;
    round += 1;
    index = 0;
    // simonPattern.length = 0;  
    userPattern.length = 0;
    showAnnouncement(`Round Won! current round:${round}`)
    console.log("advanceToNextRound triggered!, current round: ", round);
    progressSimonPattern(round);
    // console.log(simonPattern); 
}

function resetGameStats(){
    index = 0; 
    round = 1; 
    lastIndex = 0;
    simonPattern.length = 0; 
    userPattern.length = 0;
}

function showAnnouncement(gameStatus){
    document.querySelector("h1").textContent = gameStatus;
}

