/** Write a function called averagePair.
 *
 * Given a sorted array of integers and a target average,
 * determine if there is a pair of values in the array where
 * the average of the pair equals the target average.
 * There may be more than one pair that matches the average target.
 *
 * Constraints: Time Complexity: O(N)
 **/

function averagePair(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const avg = (nums[left] + nums[right]) / 2;
        if (avg === target) {
            return true;
        } else if (avg > target) {
            right--;
        } else {
            left++;
        }
    }

    return false;
}
