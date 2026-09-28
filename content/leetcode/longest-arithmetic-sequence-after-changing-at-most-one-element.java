class Solution {
    private int[] buildLeftRuns(int[] nums) {
        int[] leftRun = new int[nums.length];
        Arrays.fill(leftRun, 1);
        leftRun[1] = 2;
        for (int index = 2; index < nums.length; index++) {
            int currentDifference = nums[index] - nums[index - 1];
            int previousDifference = nums[index - 1] - nums[index - 2];
            leftRun[index] = currentDifference == previousDifference
                    ? leftRun[index - 1] + 1 : 2;
        }
        return leftRun;
    }

    private int[] buildRightRuns(int[] nums) {
        int[] rightRun = new int[nums.length];
        Arrays.fill(rightRun, 1);
        rightRun[nums.length - 2] = 2;
        for (int index = nums.length - 3; index >= 0; index--) {
            int currentDifference = nums[index + 1] - nums[index];
            int nextDifference = nums[index + 2] - nums[index + 1];
            rightRun[index] = currentDifference == nextDifference
                    ? rightRun[index + 1] + 1 : 2;
        }
        return rightRun;
    }

    private int bestChanging(int[] nums, int[] leftRun, int[] rightRun, int index) {
        int best = 1;
        if (index > 0) {
            best = Math.max(best, Math.min(nums.length, leftRun[index - 1] + 1));
        }
        if (index + 1 < nums.length) {
            best = Math.max(best, Math.min(nums.length, rightRun[index + 1] + 1));
        }
        if (index == 0 || index + 1 == nums.length) {
            return best;
        }
        int gap = nums[index + 1] - nums[index - 1];
        if (gap % 2 != 0) {
            return best;
        }
        int difference = gap / 2;
        int left = 1;
        int right = 1;
        if (index >= 2 && nums[index - 1] - nums[index - 2] == difference) {
            left = leftRun[index - 1];
        }
        if (index + 2 < nums.length && nums[index + 2] - nums[index + 1] == difference) {
            right = rightRun[index + 1];
        }
        return Math.max(best, left + right + 1);
    }

    public int longestArithmetic(int[] nums) {
        int[] leftRun = buildLeftRuns(nums);
        int[] rightRun = buildRightRuns(nums);
        int best = 2;
        for (int index = 0; index < nums.length; index++) {
            best = Math.max(best, leftRun[index]);
            best = Math.max(best, bestChanging(nums, leftRun, rightRun, index));
        }
        return best;
    }
}
