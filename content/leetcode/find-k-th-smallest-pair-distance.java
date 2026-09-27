class Solution {
    public int smallestDistancePair(int[] nums, int k) {
        Arrays.sort(nums);
        int low = 0;
        int high = nums[nums.length - 1] - nums[0];
        while (low < high) {
            int distance = (low + high) / 2;
            if (countAtMost(nums, distance) >= k) {
                high = distance;
            } else {
                low = distance + 1;
            }
        }
        return low;
    }

    private int countAtMost(int[] nums, int distance) {
        int left = 0;
        int pairs = 0;
        for (int right = 0; right < nums.length; right++) {
            while (nums[right] - nums[left] > distance) {
                left++;
            }
            pairs += right - left;
        }
        return pairs;
    }
}
