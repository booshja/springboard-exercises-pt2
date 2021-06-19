/** product: calculate the product of an array of numbers. */
function product(nums) {
    // Base Case
    if (nums.length === 0) return 1;
    // Normal Case
    return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */
function longest(words) {
    // Base Case
    if (words.length === 0) return 0;
    // Normal Case
    return words[0].length > longest(words.slice(1))
        ? words[0].length
        : longest(words.slice(1));
}

/** everyOther: return a string with every other letter. */
function everyOther(str) {
    // Base Case
    if (str.length === 0) return "";
    // Normal Case
    return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */
function isPalindrome(str, idx = 0) {
    let leftIdx = idx;
    let rightIdx = str.length - idx - 1;
    if (leftIdx >= rightIdx) return true;
    if (str[leftIdx] !== str[rightIdx]) return false;
    return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */
function findIndex(arr, val) {
    // Base Case
    // Normal Case
}

/** revString: return a copy of a string, but in reverse. */
function revString(str) {
    // Base Case
    if (str.length === 0) return "";
    // Normal Case
    return revString(str.slice(1)) + str[0];
}

/** gatherStrings: given an object, return an array of all of the string values. */
function gatherStrings(obj) {
    // Base Case
    // Normal Case
}

module.exports = {
    product,
    longest,
    everyOther,
    isPalindrome,
    findIndex,
    revString,
    gatherStrings,
    // binarySearch,
};
