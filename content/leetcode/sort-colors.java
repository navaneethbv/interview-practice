class Solution {
    public void sortColors(int[] nums) {
        int nextZero = 0;
        int current = 0;
        int nextTwo = nums.length - 1;
        while (current <= nextTwo) {
            if (nums[current] == 0) {
                swap(nums, nextZero++, current++);
            } else if (nums[current] == 2) {
                swap(nums, current, nextTwo--);
            } else {
                current++;
            }
        }
    }

    private void swap(int[] nums, int first, int second) {
        int temporary = nums[first];
        nums[first] = nums[second];
        nums[second] = temporary;
    }
}
