class Solution {
    private boolean place(int[] nums, int index, int[] buckets, int target) {
        if (index < 0) {
            return true;
        }
        Set<Integer> seenSums = new HashSet<>();
        for (int bucket = 0; bucket < buckets.length; bucket++) {
            int currentSum = buckets[bucket];
            if (!seenSums.add(currentSum) || currentSum + nums[index] > target) {
                continue;
            }
            buckets[bucket] += nums[index];
            if (place(nums, index - 1, buckets, target)) {
                return true;
            }
            buckets[bucket] -= nums[index];
            if (buckets[bucket] == 0) {
                break;
            }
        }
        return false;
    }

    public boolean canPartitionKSubsets(int[] nums, int k) {
        int total = Arrays.stream(nums).sum();
        if (total % k != 0) {
            return false;
        }
        int target = total / k;
        Arrays.sort(nums);
        if (nums[nums.length - 1] > target) {
            return false;
        }
        return place(nums, nums.length - 1, new int[k], target);
    }
}
