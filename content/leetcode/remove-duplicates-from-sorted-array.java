class Solution {
    public int removeDuplicates(int[] nums) {
        int writeIndex = 0;
        for (int value : nums) {
            if (writeIndex == 0 || value != nums[writeIndex - 1]) {
                nums[writeIndex] = value;
                writeIndex++;
            }
        }
        return writeIndex;
    }
}
