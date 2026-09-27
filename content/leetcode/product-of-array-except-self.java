class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] result = new int[nums.length];
        int prefix = 1;
        for (int index = 0; index < nums.length; index++) {
            result[index] = prefix;
            prefix *= nums[index];
        }
        int suffix = 1;
        for (int index = nums.length - 1; index >= 0; index--) {
            result[index] *= suffix;
            suffix *= nums[index];
        }
        return result;
    }
}
