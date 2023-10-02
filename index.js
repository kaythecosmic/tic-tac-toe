isHumanTurn = true
const resultBox = document.getElementById("resultBox")


board = {
    1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
}

function resetGame() {

    board = {
        1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '',
    }

    for (let i = 1; i <= 9; i++) {
        let box = document.getElementById(i);
        box.innerHTML = '';
    }

    resultBox.innerHTML = ""
    isHumanTurn = true

}

function equateBox(a, b, c) {

    let boxA = board[a];
    let boxB = board[b];
    let boxC = board[c];

    if (boxA == boxB && boxB == boxC && boxA != '') {
        return true;
    }

}

function checkWinner() {
    let winner = null;

    // Horizontals
    for (let i = 1; i < 9; i += 3) {
        if (equateBox(i, i + 1, i + 2)) {
            winner = board[i];
        }
    }


    // Verticals
    for (let i = 1; i <= 3; i++) {
        if (equateBox(i, i + 3, i + 6)) {
            winner = board[i];
        }
    }

    // Diagonals
    if (board[1] == board[5] && board[5] == board[9] && board[5] != '') {
        winner = board[5];
    }
    else if (board[3] == board[5] && board[5] == board[7] && board[5] != '') {
        winner = board[5];
    }

    let allFilled = true;
    for (let i = 1; i <= 9; i++) {
        if (board[i] == "") {
            allFilled = false;
        }
    }

    if (allFilled && winner == null) {
        return "tie";
    }
    else {
        return winner;
    }
}

function humanMoveHandler(event) {
    const box = document.getElementById(event);

    if (board[event] == '') {
        if (isHumanTurn) {
            board[event] = 'X'
            box.innerHTML = board[event];
            isHumanTurn = false;
        }
    }

    let bestScore = Infinity;
    let aiMove = "";
    let currentScore;
    for (let p = 1; p <= 9; p++) {
        if (board[p] == "") {
            board[p] = "O";
            currentScore = minimax(0, true);
            board[p] = "";
            if (currentScore < bestScore) {
                bestScore = currentScore;
                aiMove = p;
            }
        }
    }

    if (bestScore !== Infinity) {
        const aiBox = document.getElementById(aiMove.toString()).innerHTML = "O";
        board[aiMove] = "O";
        isHumanTurn = true;
    }


    winner = checkWinner();

    if (winner == "tie") {
        resultBox.innerHTML = "Its a Tie!";
    }

    else if (winner == "O") {
        resultBox.innerHTML = "AI Wins!!";
    }
    else if (winner == "X") {
        resultBox.innerHTML = "You Win!!";
    }
}

const Score = {
    "X": 1, "O": -1, "tie": 0
}

function minimax(depth, isMax) {
    let result = checkWinner();

    if (result !== null) {
        let score = Score[result];
        return score;
    }

    if (isMax) {
        let bestScore = -Infinity;

        for (let p = 1; p <= 9; p++) {
            if (board[p] == "") {
                board[p] = "X";
                currentScore = minimax(depth + 1, false);
                board[p] = "";
                bestScore = Math.max(bestScore, currentScore);
            }
        }
        return bestScore;
    }

    else {
        let bestScore = Infinity;
        for (let p = 1; p <= 9; p++) {
            if (board[p] == "") {
                board[p] = "O";
                currentScore = minimax(depth + 1, true);
                board[p] = "";
                bestScore = Math.min(bestScore, currentScore);
            }
        }
        return bestScore;
    }
}