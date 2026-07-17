let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreX = document.querySelector("#scoreX");
let scoreO = document.querySelector("#scoreO");
let turnO = true;
let gameOver = false;
let xScore = 0;
let oScore = 0;
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(gameOver) return;
        if(turnO){
            box.innerText="O";
            box.style.color="#ff4fc3";
            turnO=false;
        }
        else{
            box.innerText="X";
            box.style.color="#00d9ff";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});
const showWinner=(winner)=>{
    gameOver=true;
    msg.innerText=`🎉 ${winner} Wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if(winner=="X"){
        xScore++;
        scoreX.innerText=xScore;
    }
    else{
        oScore++;
        scoreO.innerText=oScore;
    }
};
const disableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    });
};
const enableBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=false;
        box.innerText="";
        box.style.color="white";
    });
};
const resetGame=()=>{
    turnO=true;
    gameOver=false;
    enableBoxes();
    msgContainer.classList.add("hide");
};
const checkWinner=()=>{
    let winnerFound=false;
    for(let pattern of winPatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                winnerFound=true;
                showWinner(pos1);
                return;
            }
        }
    }
    let count=0;
    boxes.forEach((box)=>{
        if(box.innerText!=""){
            count++;
        }
    });
    if(count===9 && !winnerFound){
        gameOver=true;
        msg.innerText="🤝 Match Draw!";
        msgContainer.classList.remove("hide");
    }
};
resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame);