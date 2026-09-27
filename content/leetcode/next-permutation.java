class Solution {
    public void nextPermutation(int[] nums) {
        int pivot = nums.length - 2;
        while (pivot >= 0 && nums[pivot] >= nums[pivot + 1]) {
            pivot--;
        }
        if (pivot >= 0) {
            int successor = nums.length - 1;
            while (nums[successor] <= nums[pivot]) {
                successor--;
            }
            swap(nums, pivot, successor);
        }
        reverseSuffix(nums, pivot + 1);
    }

    private void swap(int[] nums, int first, int second) {
        int temporary = nums[first];
        nums[first] = nums[second];
        nums[second] = temporary;
    }

    private void reverseSuffix(int[] nums, int left) {
        int right = nums.length - 1;
        while (left < right) {
            swap(nums, left++, right--);
        }
    }
}
