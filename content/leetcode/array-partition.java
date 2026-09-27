class Solution {
    public int arrayPairSum(int[] nums) {
        Arrays.sort(nums);
        int pairSum = 0;
        for (int index = 0; index < nums.length; index += 2) {
            pairSum += nums[index];
        }
        return pairSum;
    }
}
