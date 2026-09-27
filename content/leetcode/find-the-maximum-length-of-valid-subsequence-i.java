class Solution {
    public int maximumLength(int[] nums) {
        int evenCount = 0;
        int alternatingLength = 1;
        for (int value : nums) {
            if (value % 2 == 0) {
                evenCount++;
            }
        }
        for (int index = 1; index < nums.length; index++) {
            if (nums[index] % 2 != nums[index - 1] % 2) {
                alternatingLength++;
            }
        }
        int oddCount = nums.length - evenCount;
        return Math.max(alternatingLength, Math.max(evenCount, oddCount));
    }
}
