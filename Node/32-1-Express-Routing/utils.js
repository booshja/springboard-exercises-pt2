const ExpressError = require("./expressError");

function checkQueryString(query) {
    if (!query.nums) {
        return new ExpressError("Nums are required.", 400);
    }

    const numStrings = query.nums.split(",");
    const nums = [];
    let num;
    for (let str in numStrings) {
        num = parseInt(numStrings[str]);
        if (!num) {
            return new ExpressError(`${numStrings[str]} is not a number.`, 400);
        }
        nums.push(num);
    }

    return nums;
}

function sumNums(nums) {
    return nums.reduce((total, currValue) => {
        return total + currValue;
    });
}

function getMean(nums) {
    const sum = sumNums(nums);
    return sum / nums.length;
}

function getMedian(nums) {
    const sum = sumNums(nums);
    return sum / 2;
}

function getMode(nums) {
    let numsSort = [...nums];

    return numsSort
        .sort(
            (a, b) =>
                numsSort.filter((v) => v === a).length -
                numsSort.filter((v) => v === b).length
        )
        .pop();
}

function prepRes(operVar, oper) {
    return { response: { operation: oper, value: operVar } };
}

module.exports = { checkQueryString, sumNums, getMode, getMedian, getMean };
