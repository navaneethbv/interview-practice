class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> lastIndex = new HashMap<>();
        for (int index = 0; index < nums.length; index++) {
            Integer previousIndex = lastIndex.get(nums[index]);
            if (previousIndex != null && index - previousIndex <= k) {
                return true;
            }
            lastIndex.put(nums[index], index);
        }
        return false;
    }
}
