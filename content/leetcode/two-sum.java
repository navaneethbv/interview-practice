class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int index = 0; index < nums.length; index++) {
            int value = nums[index];
            int complement = target - value;
            if (seen.containsKey(complement)) {
                return new int[] {seen.get(complement), index};
            }
            seen.put(value, index);
        }
        throw new IllegalArgumentException("A valid pair is required");
    }
}
