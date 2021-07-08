/** Write a function called sameFrequency.
 * Given two positive integers, find out if the two numbers have
 * the same frequency of digits.
 *
 * Constraints: Time Complexity - O(N + M)
 **/

function sameFrequency(firstInt, secondInt) {
    // convert integers to strings
    const str1 = firstInt.toString();
    const str2 = secondInt.toString();
    if (str1.length !== str1.length) return false;

    let counter1 = {};
    let counter2 = {};

    for (let i = 0; i < str1.length; i++) {
        counter1[str1[i]] = (counter1[str1[i]] || 0) + 1;
    }

    for (let j = 0; j < str2.length; j++) {
        counter2[str2[j]] = (counter2[str2[j]] || 0) + 1;
    }

    for (let key in counter1) {
        if (counter1[key] !== counter2[key]) return false;
    }

    // no matching restrictions, frequency is the same
    return true;
}
