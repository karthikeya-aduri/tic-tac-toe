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

function checkSubsets(a, b, c) {
    return (a === 0 && b === 1 && c === 2) ||
        (a === 3 && b === 4 && c === 5) ||
        (a === 6 && b === 7 && c === 8) ||
        (a === 0 && b === 3 && c === 6) ||
        (a === 1 && b === 4 && c === 7) ||
        (a === 2 && b === 5 && c === 8) ||
        (a === 0 && b === 4 && c === 8) ||
        (a === 2 && b === 4 && c === 6);
}

function checkChoices(choices) {
    if (choices.length < 3) {
        return -1;
    }

    let result1 = checkSubsets(choices[0], choices[1], choices[2]);
    if (choices.length === 3) {
        return (result1 === true) ? 1 : 0;
    }

    let result2 = checkSubsets(choices[0], choices[1], choices[3]);
    let result3 = checkSubsets(choices[0], choices[2], choices[3]);
    let result4 = checkSubsets(choices[1], choices[2], choices[3]);
    if (choices.length === 4) {
        return ((result1 || result2 || result3 || result4) === true) ? 1 : 0;
    }

    let result5 = checkSubsets(choices[0], choices[1], choices[4]);
    let result6 = checkSubsets(choices[0], choices[2], choices[4]);
    let result7 = checkSubsets(choices[0], choices[3], choices[4]);
    let result8 = checkSubsets(choices[1], choices[2], choices[4]);
    let result9 = checkSubsets(choices[1], choices[3], choices[4]);
    let result10 = checkSubsets(choices[2], choices[3], choices[4]);
    if (choices.length === 5) {
        return ((result1 || result2 || result3 || result4 || result5 || result6 || result7 || result8 || result9 || result10) === true) ? 1 : 0;
    }
}

function evalWinCondition(userChoices, compChoices, userTurn, boardSize) {
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
    if (boardSize === 0) {
        return 0;
    }
    return -1;
}

function changeImage(button, path) {
    let child = button.querySelector('img');
    if (child) {
        child.src = path;
    }
}

function clearButtons(buttons) {
    buttons.forEach((button) => {
        let child = button.querySelector('img');
        child.src = './assets/blank.png';
    });
}

function runGame(user) {
    let boardSize = 9;
    let remaining = Array.from({ length: boardSize }, (_, index) => index);

    let userTurn, userSource, compSource;
    if (user === 1) {
        userTurn = true;
        userSource = './assets/x.png';
        compSource = './assets/o.png';
    }
    else {
        userTurn = false;
        userSource = './assets/o.png';
        compSource = './assets/x.png';
    }

    let userChoices = [];
    let compChoices = [];

    function computerMove(buttons) {
        //console.log('Remaining : ' + remaining);
        let compChoiceIndex = Math.floor(Math.random() * remaining.length);
        let compChoice = remaining[compChoiceIndex];
        compChoices.push(compChoice);
        compChoices.sort();
        changeImage(buttons[compChoice], compSource);
        boardSize--;
        remaining.splice(compChoiceIndex, 1);
        //console.log('Bot chose : ' + compChoice);
        let winner = evalWinCondition(userChoices, compChoices, userTurn, boardSize);
        if (winner !== -1) {
            switch (winner) {
                case 0: alert('It\'s a tie. Click reset to start again.'); break;
                case 1: alert('You win. Click reset to start again.'); remaining.splice(0); break;
                case 2: alert('You lose. Click reset to start again.'); remaining.splice(0); break;
            }
        }
        userTurn = true;
    }

    let buttons = document.querySelectorAll('.point');
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (userTurn === true) {
                if (remaining.includes(index) === true) {
                    //console.log('Remaining : ' + remaining);
                    userChoices.push(index);
                    userChoices.sort();
                    changeImage(button, userSource);
                    let temp = binarySearch(remaining, index);
                    remaining.splice(temp, 1);
                    boardSize--;
                    //console.log('You chose : ' + index);
                    let winner = evalWinCondition(userChoices, compChoices, userTurn, boardSize);
                    if (winner !== -1) {
                        switch (winner) {
                            case 0: alert('It\'s a tie. Click reset to start again.'); break;
                            case 1: alert('You win. Click reset to start again.'); remaining.splice(0); break;
                            case 2: alert('You lose. Click reset to start again.'); remaining.splice(0); break;
                        }
                    }
                    if (remaining.length !== 0) {
                        setTimeout(computerMove, 500, buttons);
                    }
                    userTurn = false;
                }
            }
        });
    });

    if (user === 2) {
        computerMove(buttons);
    }
}

function init() {
    let x = document.querySelector('#x');
    let o = document.querySelector('#o');
    let play = document.querySelector('#play');
    let reset = document.querySelector('#reset');
    let buttons = document.querySelectorAll('.point');
    let user = 0;
    x.addEventListener("click", () => {
        if (user === 0) {
            x.classList.add("toggled");
        }
        else if (user === 2) {
            o.classList.remove("toggled");
            x.classList.add("toggled");
        }
        user = 1;
    });
    o.addEventListener("click", () => {
        if (user === 0) {
            o.classList.add("toggled");
        }
        else if (user === 1) {
            x.classList.remove("toggled");
            o.classList.add("toggled");
        }
        user = 2;
    });
    play.addEventListener("click", () => {
        if (user === 0) {
            alert('Choose X or O before playing');
        }
        else {
            if (play.innerText !== 'Playing') {
                play.classList.add("toggled");
                play.innerText = 'Playing';
                runGame(user);
            }
        };
    });
    reset.addEventListener("click", () => {
        clearButtons(buttons);
        user = 0;
        play.classList.remove("toggled");
        x.classList.remove("toggled");
        o.classList.remove("toggled");
        play.innerText = 'Play';
    });
}

init();
