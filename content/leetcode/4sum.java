class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> quadruplets = new ArrayList<>();
        for (int first = 0; first < nums.length - 3; first++) {
            if (first > 0 && nums[first] == nums[first - 1]) {
                continue;
            }
            for (int second = first + 1; second < nums.length - 2; second++) {
                if (second > first + 1 && nums[second] == nums[second - 1]) {
                    continue;
                }
                collectPairs(nums, first, second, target, quadruplets);
            }
        }
        return quadruplets;
    }

    private void collectPairs(
            int[] nums,
            int first,
            int second,
            int target,
            List<List<Integer>> quadruplets) {
        int left = second + 1;
        int right = nums.length - 1;
        while (left < right) {
            long total = (long) nums[first] + nums[second] + nums[left] + nums[right];
            if (total < target) {
                left++;
            } else if (total > target) {
                right--;
            } else {
                quadruplets.add(Arrays.asList(
                        nums[first], nums[second], nums[left], nums[right]));
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) {
                    left++;
                }
                while (left < right && nums[right] == nums[right + 1]) {
                    right--;
                }
            }
        }
    }
}
