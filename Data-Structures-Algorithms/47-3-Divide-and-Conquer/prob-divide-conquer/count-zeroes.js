function countZeroes(input) {
    let leftIdx = 0;
    let rightIdx = input.length - 1;
    while (leftIdx <= rightIdx) {
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = input[middleIdx];
        if (middleVal === 1) {
            leftIdx = middleIdx + 1;
        } else if (middleVal === 0 && input[middleIdx - 1] === 0) {
            rightIdx = middleIdx - 1;
        } else {
            return input.length - middleIdx;
        }
    }
    return 0;
}

module.exports = countZeroes;
