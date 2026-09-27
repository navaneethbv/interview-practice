class Solution {
public boolean check(int[] nums) {
    int drops = 0;
    for (int index = 0; index < nums.length; index++) {
        int nextIndex = (index + 1) % nums.length;
        if (nums[index] > nums[nextIndex]) {
            drops++;
        }
    }
    return drops <= 1;
}
}
