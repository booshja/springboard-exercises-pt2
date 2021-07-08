/** Given an array of integers, and a targetSumber, find the targetSumber of
 * pairs of integers in the array whose sum is equal to the second
 * parameter. You can assume that there will be no duplicate values
 * in the array.
 *
 * Constraints: Time Complexity - O(N * log(N)) or O(N)
 * */

function countPairs(arr, targetSum) {
    arr.sort((a, b) => a - b);
    let total = 0;
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
        let sum = arr[start] + arr[end];
        if (sum === targetSum) {
            total++;
            start++;
            end--;
        } else if (sum < targetSum) {
            start++;
        } else {
            end--;
        }
    }
    return total;
}
