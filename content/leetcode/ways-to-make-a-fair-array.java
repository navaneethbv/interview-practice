class Solution {
    public int waysToMakeFair(int[] nums) {
        int[] right = new int[2];
        for (int index = 0; index < nums.length; index++) {
            right[index % 2] += nums[index];
        }
        int[] left = new int[2];
        int count = 0;
        for (int index = 0; index < nums.length; index++) {
            int parity = index % 2;
            right[parity] -= nums[index];
            if (left[0] + right[1] == left[1] + right[0]) {
                count++;
            }
            left[parity] += nums[index];
        }
        return count;
    }
}
