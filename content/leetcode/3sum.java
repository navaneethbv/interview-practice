class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        for (int anchor = 0; anchor < nums.length - 2; anchor++) {
            if (anchor == 0 || nums[anchor] != nums[anchor - 1]) {
                collectPairs(nums, anchor, result);
            }
        }
        return result;
    }

    private void collectPairs(int[] nums, int anchor, List<List<Integer>> result) {
        int left = anchor + 1;
        int right = nums.length - 1;
        while (left < right) {
            int total = nums[anchor] + nums[left] + nums[right];
            if (total < 0) {
                left++;
            } else if (total > 0) {
                right--;
            } else {
                result.add(Arrays.asList(nums[anchor], nums[left], nums[right]));
                left = nextDistinct(nums, left, right);
                right--;
            }
        }
    }

    private int nextDistinct(int[] nums, int left, int right) {
        int previous = nums[left];
        do {
            left++;
        } while (left < right && nums[left] == previous);
        return left;
    }
}
