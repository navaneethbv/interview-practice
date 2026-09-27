class Solution {
    public void rotate(int[] nums, int k) {
        int rotations = k % nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, rotations - 1);
        reverse(nums, rotations, nums.length - 1);
    }

    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            int temporary = nums[left];
            nums[left++] = nums[right];
            nums[right--] = temporary;
        }
    }
}
