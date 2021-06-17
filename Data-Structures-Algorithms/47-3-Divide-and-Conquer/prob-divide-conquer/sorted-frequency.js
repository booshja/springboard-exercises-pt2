function sortedFrequency(array, val) {
    let leftIdx = 0;
    let leftFoundIdx = null;
    let rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        // Find first occurance of val
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];

        if (middleVal < val) {
            leftIdx = middleIdx + 1;
        } else if (middleVal > val) {
            rightIdx = middleIdx - 1;
        } else if (
            middleVal === val &&
            (array[middleIdx - 1] === val || undefined)
        ) {
            rightIdx = middleIdx - 1;
        } else if (middleVal === val && array[middleIdx - 1] !== val) {
            leftFoundIdx = middleIdx;
            leftIdx = rightIdx + 1;
        }
    }

    // value not found, return -1
    if (leftFoundIdx === null) return -1;

    leftIdx = leftFoundIdx;
    rightIdx = array.length - 1;

    while (leftIdx <= rightIdx) {
        // Find last occurance of val
        let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        let middleVal = array[middleIdx];

        if (middleVal > val) {
            rightIdx = middleIdx - 1;
        } else if (
            middleVal === val &&
            (array[middleIdx + 1] === val || undefined)
        ) {
            leftIdx = middleIdx + 1;
        } else {
            return middleIdx - leftFoundIdx + 1;
        }
    }
}

module.exports = sortedFrequency;
