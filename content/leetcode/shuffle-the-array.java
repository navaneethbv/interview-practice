class Solution {
    public int[] shuffle(int[] nums, int n) {
        int[] result = new int[2 * n];
        for (int index = 0; index < n; index++) {
            result[2 * index] = nums[index];
            result[2 * index + 1] = nums[n + index];
        }
        return result;
    }
}
