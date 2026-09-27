class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        int[] prefixCounts = new int[nums.length + 1];
        prefixCounts[0] = 1;
        int oddCount = 0;
        int total = 0;
        for (int value : nums) {
            oddCount += value % 2;
            if (oddCount >= k) {
                total += prefixCounts[oddCount - k];
            }
            prefixCounts[oddCount]++;
        }
        return total;
    }
}
