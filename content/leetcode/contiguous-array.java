class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> firstIndex = new HashMap<>();
        firstIndex.put(0, -1);
        int balance = 0;
        int longest = 0;
        for (int index = 0; index < nums.length; index++) {
            balance += nums[index] == 1 ? 1 : -1;
            if (firstIndex.containsKey(balance)) {
                longest = Math.max(longest, index - firstIndex.get(balance));
            } else {
                firstIndex.put(balance, index);
            }
        }
        return longest;
    }
}
