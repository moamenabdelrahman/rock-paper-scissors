const movesIcons = {
    rock: `<i class="fa-solid fa-hand-fist"></i>`,
    paper: `<i class="fa-solid fa-hand"></i>`,
    scissors: `<i class="fa-solid fa-hand-peace"></i>`
};

const summary = JSON.parse(localStorage.getItem('summary')) || { wins: 0, losses: 0, ties: 0 };

const reportSection = document.querySelector('.report');
const resultHeader = document.querySelector('.result');
const youMoveIcon = document.querySelector('.you-move');
const computerMoveIcon = document.querySelector('.computer-move');
const summarySection = document.querySelector('.summary');

displaySummary();

function moveResult(you, computer) {
    const result = {
        you: ['You win.', 1],
        computer: ['You lose.', -1],
        tie: ['Tie.', 0]
    };

    if(you === computer) return result.tie;

    if(you === 'rock') {
        switch (computer) {
            case 'paper':
                return result.computer;
            case 'scissors':
                return result.you;
        }
    }

    if(you === 'paper') {
        switch (computer) {
            case 'rock':
                return result.you;
            case 'scissors':
                return result.computer;
        }
    }

    if(you === 'scissors') {
        switch (computer) {
            case 'rock':
                return result.computer;
            case 'paper':
                return result.you;
        }
    }
}

function pickComputerMove() {
    const rnd = Math.random();
    if(rnd < 1/3) return 'rock';
    else if(rnd < 2/3) return 'paper';
    else return 'scissors';
}

function playGame(move) {
    const computerMove = pickComputerMove();
    const result = moveResult(move, computerMove);

    if(result[1] === 1) summary.wins++;
    else if(result[1] === -1) summary.losses++;
    else summary.ties++;
    
    localStorage.setItem('summary', JSON.stringify(summary));

    resultHeader.innerHTML = result[0];
    youMoveIcon.innerHTML = movesIcons[move];
    computerMoveIcon.innerHTML = movesIcons[computerMove];

    displaySummary();
    showReport();
}

function resetGame() {
    summary.wins = 0;
    summary.losses = 0;
    summary.ties = 0;
    localStorage.setItem('summary', JSON.stringify(summary));
    
    displaySummary();
    hideReport();
}

function displaySummary() {
    summarySection.innerHTML = `Wins: ${summary.wins}, Losses: ${summary.losses}, Ties: ${summary.ties}`
}

function showReport() {
    reportSection.classList.remove('d-none');
}

function hideReport() {
    reportSection.classList.add('d-none');
}