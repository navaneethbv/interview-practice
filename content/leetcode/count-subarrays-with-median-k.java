class Solution {
    public int countSubarrays(int[] nums, int k) {
        int pivot = 0;
        while (nums[pivot] != k) {
            pivot++;
        }
        Map<Integer, Integer> leftBalances = new HashMap<>();
        leftBalances.put(0, 1);
        int balance = 0;
        for (int index = pivot - 1; index >= 0; index--) {
            balance += nums[index] > k ? 1 : -1;
            leftBalances.put(balance, leftBalances.getOrDefault(balance, 0) + 1);
        }
        int result = leftBalances.getOrDefault(0, 0) + leftBalances.getOrDefault(1, 0);
        balance = 0;
        for (int index = pivot + 1; index < nums.length; index++) {
            balance += nums[index] > k ? 1 : -1;
            result += leftBalances.getOrDefault(-balance, 0);
            result += leftBalances.getOrDefault(1 - balance, 0);
        }
        return result;
    }
}
