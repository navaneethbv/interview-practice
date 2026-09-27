class Solution {
    public void moveZeroes(int[] nums) {
        int writeIndex = 0;
        for (int readIndex = 0; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] != 0) {
                int temporary = nums[writeIndex];
                nums[writeIndex++] = nums[readIndex];
                nums[readIndex] = temporary;
            }
        }
    }
}
