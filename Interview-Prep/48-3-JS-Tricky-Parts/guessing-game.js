function guessingGame() {
    let guesses = 0;
    let hasWon = false;
    const target = Math.floor(Math.random() * 100);

    return function (guess) {
        if (hasWon) return "The game is over, you already won!";
        guesses++;
        if (guess === target) {
            hasWon = true;
            return `You win! You found ${target} in ${guesses} guesses.`;
        } else if (guess > target) {
            return `${guess} is too high!`;
        } else if (guess < target) {
            return `${guess} is too low!`;
        }
    };
}

module.exports = { guessingGame };
