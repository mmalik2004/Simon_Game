let gameseq = [];
let userseq = [];

let maxScore = 0;
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let gameOverCalled = false;

let h2 = document.querySelector("h2");
let timeDisplay = document.getElementById("timer");
let timer;
let timeLimit = 5;

const sounds = {
    yellow: new Audio("sounds/yellow.ogg"),
    red: new Audio("sounds/red.mp3"),
    purple: new Audio("sounds/purple.ogg"),
    green: new Audio("sounds/green.wav"),
    wrong: new Audio("sounds/over.mp3"),
    bonus: new Audio("sounds/bonus.mp3")
};

const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

function gameflash(btn, color) {
    btn.classList.add("flash");
    sounds[color].play();
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userflash(btn, color) {
    btn.classList.add("userflash");
    sounds[color].play();
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function updateTimer() {
    clearInterval(timer);
    let remaining = timeLimit;
    timeDisplay.innerText = remaining;
    timer = setInterval(() => {
        remaining--;
        timeDisplay.innerText = remaining;
        if (remaining <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    updateDifficulty();
    updateTimer();
    let randIdx = Math.floor(Math.random() * 4);
    let randColr = btns[randIdx];
    gameseq.push(randColr);
    let randBtn = document.querySelector(`.${randColr}`);
    gameflash(randBtn, randColr);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    if (gameOverCalled) return;
    gameOverCalled = true;

    sounds.wrong.play();
    maxScore = Math.max(maxScore, level);
    h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Maximum Score: ${maxScore} <br> Press any key to start.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "", 150);
    reset();
}

function btnpress() {
    let btn = this;
    let usercolr = btn.getAttribute("id");
    userflash(btn, usercolr);
    userseq.push(usercolr);
    checkAns(userseq.length - 1);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    gameOverCalled = false;
    clearInterval(timer);
    timeDisplay.innerText = "-";
}

function updateDifficulty() {
    let difficulty = document.getElementById("difficulty").value;
    switch (difficulty) {
        case "easy":
            timeLimit = 7;
            break;
        case "medium":
            timeLimit = 5;
            break;
        case "hard":
            timeLimit = 3;
            break;
    }
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}
