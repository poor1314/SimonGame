// add visual
// 2. show game pattern 
// pattern doesn't show correctly 

const buttonColors = ["red", "blue", "green", "yellow"];
const simonPattern = [];
const userPattern = [];
let round = 1;
let index = 0; // might need to be naming this
const blueButtonSound = new Audio('/sounds/blue.mp3');
const greenButtonSound = new Audio("/sounds/green.mp3");
const redButtonSound = new Audio("/sounds/red.mp3"); 
const yellowButtonSound = new Audio("/sounds/yellow.mp3");
const wrongChoiceSound = new Audio("/sounds/wrong.mp3")
let animationComplete = false;

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
    
    console.log("e.target:" , e.target);
    console.log(userColor);
    
    if (e.target.classList.contains("btn") && simonPattern.length > 0){
        gameEffect(currentElement, "opacityChange");
        compareUserAndSimonPattern(userColor, currentElement);
    } 
    console.log("simonPattern atClick", simonPattern);
    console.log("userPattern atClick", userPattern);
})




function gameStart(e){
    if(e.key === " "){
        progressSimonPattern(round);
        
        console.log("Game Starts!",simonPattern);
        showAnnouncement(`Game Start! Current Round:${round}`)
    }
}

function indexGenerate(){
   return Math.floor((Math.random() * 4));
}

function progressSimonPattern(round){
    for(let i = 0; i < round; i++ ){
        simonPattern.push(buttonColors[indexGenerate()])
        let color = document.querySelector("." + buttonColors[i]);
        console.log("whats the color?", color);
        
        gameEffect(color, "opacityChange");
    }  
}

function gameEffect(currentElement, message){
    currentElement.classList.toggle(message);
    setTimeout(() => {
        currentElement.classList.toggle(message);
    }, 200);
}

function compareUserAndSimonPattern(userColor){
    showAnnouncement(`Current Round:${round}`)
   

    // if (buttonColors.includes(userColor)) soundAnnouncement(userColor);
   
    if(userColor === simonPattern[index]){
        userPattern.push(simonPattern[index])
        index += 1;
    }
    else{
        showAnnouncement(`Game lost! ${simonPattern[index]}(Simon) vs ${userColor}(you) \n press space to start new game!`)
        resetGameStats();
        // document.body.classList.toggle(message)
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#011F3F";
        }, 200);
        return;
    }
    // hasPlayerWonCurrentRound()
    // replace the 1st if-statement with the above line when proceed to next round works
    if(simonPattern.length === userPattern.length){
        console.log("round won!");
        
        advanceToNextRound()
        // showAnnouncement(`Current Round:${round}`)
        // console.log(`current: ${round}`,simonPattern); 
        // call nextRound()
    }
    if(simonPattern.length > 4){
        hasPlayerWonFullGame("Player won! press space to start a new game"); 
    }
}

function hasPlayerWonFullGame(gameWonText){
    showAnnouncement(gameWonText);
    resetGameStats();
}

function advanceToNextRound(){
    round += 1;
    index = 0;
    simonPattern.length = 0; 
    userPattern.length = 0;
    showAnnouncement(`Round Won! proceed to round:${round}`)
    console.log("advanceToNextRound triggered!, current round: ", round);
    progressSimonPattern(round);
    console.log(simonPattern); 
    
}



function resetGameStats(){
    index = 0; 
    round = 1; 
    simonPattern.length = 0; 
    userPattern.length = 0;
}

function visualAid(){
}

function showAnnouncement(gameStatus){
    document.querySelector("h1").textContent = gameStatus;
}

function freezeScreen(){
}

// const myTimeout = setTimeout(myGreeting, 5000);

// function myStopFunction() {
//   clearTimeout(myTimeout);
// }


