class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int best = nums[0] + nums[1] + nums[2];
        for (int firstIndex = 0; firstIndex < nums.length - 2; firstIndex++) {
            int left = firstIndex + 1;
            int right = nums.length - 1;
            while (left < right) {
                int total = nums[firstIndex] + nums[left] + nums[right];
                if (Math.abs(total - target) < Math.abs(best - target)) {
                    best = total;
                }
                if (total == target) {
                    return total;
                }
                if (total < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return best;
    }
}
