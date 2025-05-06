const buttonColors = ["red", "blue", "green", "yellow"];
const simonPattern = [];
const userPattern = [];
let round = 1;
let index = 0; // might need to be naming this


// start game() by pressing space
document.addEventListener("keydown", e =>{
    gameStart(e);
})

// user click on button and should match with the pattern
document.addEventListener("click", e => {
    let userColor = e.target.id;
    compareUserAndSimonPattern(userColor);
})

function gameStart(e){
    // console.log(e);
    if(e.key === " "){
        progressSimonPattern(round);
        console.log("Game Starts!",simonPattern);
        showAnnouncement(`Current Round:${round}`)
    }
}

function progressSimonPattern(round){
    let randomIndex = Math.floor((Math.random() * 4));
    for(let i = 0; i < round; i++ ){
        simonPattern.push(buttonColors[randomIndex])
    }  
}

function compareUserAndSimonPattern(userColor){
    console.log(userColor);

    // hasPlayerWonCurrentRound()
    // replace the 1st if-statement with the above line when proceed to next round works
    if(simonPattern.length === userPattern.length){

        advanceToNextRound()
        showAnnouncement(`Current Round:${round}`)
        // call nextRound()
 
    }else if(userColor === simonPattern[index]){
        console.log("yes, it's", simonPattern[index]);
        userPattern.push(simonPattern[index])
        index += 1;
    }
    else{
        showAnnouncement(`Game failed Simon's ${simonPattern[index]} vs your ${userColor}`)
        console.log(`game failed ${userColor} not equals to ${simonPattern[index]}`);
        // 1 mis-click = immediately lost
        // gameStart()
    }
    console.log(index);
}

function hasPlayerWonCurrentRound(){
    if(simonPattern.length === userPattern.length){
        // advanceToNextRound()
        // announce game won via text
        // call nextRound()
        advanceToNextRound()
    }
}

function hasPlayerWonFullGame(){
}

function advanceToNextRound(){
    round += 1;
    progressSimonPattern(round)
}

function gameOver(){
    resetGameStats()
}

function resetGameStats(){
    simonPattern = [];
    userPattern = [];
    round = 1; 
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
