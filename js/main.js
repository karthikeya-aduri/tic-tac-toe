function binarySearch(arr, target) {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        else if (arr[mid] < target) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }
    return undefined;
}

function runGame() {
    const user = (prompt('Enter your choice (X or O)') === 'X') ? 1 : 2;
    const comp = (user === 1) ? 2 : 1;
    let boardSize = 9;
    let board = new Array(boardSize).fill(0);
    let remaining = Array.from({ length: boardSize }, (_, index) => index);
    let userTurn = (user === 1) ? true : false;
    while (boardSize !== 0) {
        if (userTurn === true) {
            let userChoice = Number(prompt('Enter the index to place your input (0 - 8) :'));
            if (remaining.includes(userChoice) === false) {
                console.log('Invalid index given');
                continue;
            }
            board[userChoice] = user;
            let temp = binarySearch(remaining, userChoice);
            remaining.splice(temp, 1);
            boardSize--;
            userTurn = !userTurn;
        }
        else {
            let compChoice = Math.floor(Math.random() * remaining.length);
            board[remaining[compChoice]] = comp;
            remaining.splice(compChoice, 1);
            boardSize--;
            userTurn = !userTurn;
        }
    }
}

runGame();
