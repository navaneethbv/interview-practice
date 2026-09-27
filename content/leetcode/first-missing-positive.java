class Solution {
    public int firstMissingPositive(int[] nums) {
        int length = nums.length;
        for (int index = 0; index < length; index++) {
            while (nums[index] >= 1 && nums[index] <= length
                    && nums[nums[index] - 1] != nums[index]) {
                int targetIndex = nums[index] - 1;
                swap(nums, index, targetIndex);
            }
        }
        for (int index = 0; index < length; index++) {
            if (nums[index] != index + 1) {
                return index + 1;
            }
        }
        return length + 1;
    }

    private void swap(int[] nums, int first, int second) {
        int temporary = nums[first];
        nums[first] = nums[second];
        nums[second] = temporary;
    }
}
