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

function checkChoices(choices) {
    if (choices.length < 3) {
        return -1;
    }

    let diff1 = choices[1] - choices[0];
    let diff2 = choices[2] - choices[1];

    if (choices.length === 3) {
        return diff1 === diff2 ? 1 : 0;
    }

    let diff3 = choices[3] - choices[2];

    if (choices.length === 4) {
        return (diff1 === diff2 && diff2 === diff3) ? 1 : 0;
    }

    let diff4 = choices[4] - choices[3];

    if (choices.length === 5) {
        if (diff1 === diff2 && diff2 === diff3 && diff3 === diff4) {
            return 1;
        }
        return 0;
    }
}

function checkVictory(userChoices, compChoices, userTurn) {
    if (userTurn === true) {
        const userFlag = checkChoices(userChoices);
        if (userFlag === 1) {
            return 1;
        }
        const compFlag = checkChoices(compChoices);
        if (compFlag === 1) {
            return 2;
        }
    }
    else {
        const compFlag = checkChoices(compChoices);
        if (compFlag === 1) {
            return 2;
        }
        const userFlag = checkChoices(userChoices);
        if (userFlag === 1) {
            return 1;
        }
    }
    return 0;
}

function runGame() {
    const user = (prompt('Enter your choice (X or O)') === 'X') ? 1 : 2;
    let boardSize = 9;
    let remaining = Array.from({ length: boardSize }, (_, index) => index);
    let userTurn = (user === 1) ? true : false;
    let userChoices = [];
    let compChoices = [];
    while (boardSize !== 0) {
        console.log('Remaining = ' + remaining);
        if (userTurn === true) {
            let userChoice = Number(prompt('Enter the index to place your input (0 - 8) :'));
            if (remaining.includes(userChoice) === false) {
                console.log('Invalid index given');
                continue;
            }
            userChoices.push(userChoice);
            userChoices.sort();
            let temp = binarySearch(remaining, userChoice);
            remaining.splice(temp, 1);
            boardSize--;
            console.log('You chose : ' + userChoice);
            userTurn = !userTurn;
        }
        else {
            let compChoice = Math.floor(Math.random() * remaining.length);
            compChoices.push(remaining[compChoice]);
            compChoices.sort();
            console.log('Bot chose : ' + remaining[compChoice]);
            boardSize--;
            remaining.splice(compChoice, 1);
            userTurn = !userTurn;
        }
        let winner = checkVictory(userChoices, compChoices, userTurn);
        if (winner > 0) {
            if (winner == 1) {
                console.log('You win');
            }
            else {
                console.log('You Lose');
            }
            break;
        }
    }
}

runGame();
