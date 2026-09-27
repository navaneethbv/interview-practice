class Solution {
    public int removeElement(int[] nums, int val) {
        int writeIndex = 0;
        for (int value : nums) {
            if (value != val) {
                nums[writeIndex] = value;
                writeIndex++;
            }
        }
        return writeIndex;
    }
}
