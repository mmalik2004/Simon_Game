let gameseq=[];
let userseq=[];

let maxScore=0;
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
    }
    levelup();
})
function gameflash(btn){
btn.classList.add("flash");
setTimeout(function (){
    btn.classList.remove("flash");
},250);

}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);
    
}
function levelup(){
    userseq=[];
    level++;
h2.innerText=`Level ${level}`;
let randIdx=Math.floor(Math.random() *3);
let randColr=btns[randIdx];

let randBtn=document.querySelector(`.${randColr}`);
gameseq.push(randColr);
    gameflash(randBtn);
}

function checkAns(idx){

if(userseq[idx]===gameseq[idx]){
    if(userseq.length==gameseq.length){
       setTimeout( levelup,1000);
    }
}else{
    
    
   maxScore=Math.max(maxScore,level);
    h2.innerHTML=`Game Over!  Your score was <b> ${level}</b>. Maximum Score: ${maxScore} <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout( function (){
        document.querySelector("body").style.backgroundColor="white";
    } , 150);                  
    reset();
}
}
function btnpress(){
    console.log("btn was press");
    let btn=this;
    userflash(btn);
    usercolr=btn.getAttribute("id");
    userseq.push(usercolr);

    checkAns(userseq.length-1);
}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;

}