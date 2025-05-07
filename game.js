// now the game have set a pattern
// user can match the pattern
// but it doesn't proceed to the next level

const buttonColors = ["red", "blue", "green", "yellow"];
const simonPattern = [];
const userPattern = [];
let round = 4;
let index = 0; // might need to be naming this

// start game() by pressing space
document.addEventListener("keydown", e =>{
    if (simonPattern.length === 0 ) gameStart(e);
})
 
// user click on button and should match with the pattern
document.addEventListener("click", e => {
    let userColor = e.target.id;
    if (e.target.classList.contains("btn") && simonPattern.length > 0) compareUserAndSimonPattern(userColor);
    console.log("simonPattern atClick", simonPattern);
    console.log("userPattern atClick", userPattern);

    
})

function gameStart(e){
    if(e.key === " "){
        progressSimonPattern(round);
        console.log("Game Starts!",simonPattern);
        showAnnouncement(`Current Round:${round}`)
    }
}

function indexGenerate(){
   return Math.floor((Math.random() * 4));
}

function progressSimonPattern(round){
    console.log("generate Round", round);
    
    for(let i = 0; i < round; i++ ){
        simonPattern.push(buttonColors[indexGenerate()])
    }  
}

function compareUserAndSimonPattern(userColor){
   
    if(userColor === simonPattern[index]){
        userPattern.push(simonPattern[index])
        index += 1;
    }
    else{
        showAnnouncement(`Game failed Simon's ${simonPattern[index]} vs your ${userColor}`)
        // hasPlayerWonFullGame("won match, Game lost!");
        // return; 
    }
    // hasPlayerWonCurrentRound()
    // replace the 1st if-statement with the above line when proceed to next round works
    if(simonPattern.length === userPattern.length){
        console.log("round won!");
        
        advanceToNextRound()
        showAnnouncement(`Current Round:${round}`)
        // console.log(`current: ${round}`,simonPattern); 
        // call nextRound()
    }
    if(simonPattern.length > 4){
        hasPlayerWonFullGame("Player won! press space to start a new game"); 
    }
}

function hasPlayerWonFullGame(gameText){
    showAnnouncement("Player won! press space to start a new game");
    resetGameStats();
}

function advanceToNextRound(){
    round += 1;
    index = 0;
    simonPattern.length = 0; 
    userPattern.length = 0;
    console.log("advanceToNextRound triggered!, current round: ", round);
    progressSimonPattern(round);
    console.log(simonPattern); 
    
}

function gameOver(){
    resetGameStats()
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


// ---------------------------------------------------------

// function checkWinCondition(userColor){
//     console.log(userColor);

//     if(simonPattern.length === userPattern.length){
//         // advanceToNextRound()
//         // announce game won via text
//         // call nextRound()

//     }else if(userColor === simonPattern[index]){
//         console.log("yes, it's", simonPattern[index]);
//         userPattern.push(simonPattern[index])
//         index += 1;
//     }
//     else{
//         console.log(`game failed ${userColor} not equals to ${simonPattern[index]}`);
//         // 1 mis-click = immediately lost
//         // gameStart()
//     }
//     console.log(index);
// }


// console.log(simonPattern);
// console.log(userPattern);

// // this should control newRound
// // call this when there's new game or new round with updated round
// function newRound(){
//     for(let i = 0; i < round; i++ ){
//         // console.log(simonPattern[i]);
//         // console.log(userPattern[i]);
//         console.log("current i:", i);

//         if(simonPattern[i] === userPattern[i] && i === simonPattern.length - 1){
//             console.log("you've won");
//             round += 1;
//         }else if(simonPattern[i] === userPattern[i]){
//             console.log("still correct for this i:", i);
//         }else{
//             console.log(`"${simonPattern[i]}" doesn't match with "${userPattern[i]}" game failed!` );
//             return;
//         }
//     }
// }

// console.log(newRound());
