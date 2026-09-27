class Solution {
    public int removeDuplicates(int[] nums) {
        int writeIndex = 0;

        for (int value : nums) {
            if (writeIndex < 2 || value != nums[writeIndex - 2]) {
                nums[writeIndex] = value;
                writeIndex++;
            }
        }
        return writeIndex;
    }
}
