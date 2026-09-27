class Solution {
    public int splitArray(int[] nums, int k) {
        int left = 0;
        int right = 0;
        for (int value : nums) {
            left = Math.max(left, value);
            right += value;
        }

        while (left < right) {
            int limit = left + (right - left) / 2;
            int parts = requiredParts(nums, limit);

            if (parts <= k) {
                right = limit;
            } else {
                left = limit + 1;
            }
        }

        return left;
    }

    private int requiredParts(int[] nums, int limit) {
        int parts = 1;
        int currentSum = 0;

        for (int value : nums) {
            if (currentSum + value > limit) {
                parts++;
                currentSum = 0;
            }
            currentSum += value;
        }

        return parts;
    }
}
