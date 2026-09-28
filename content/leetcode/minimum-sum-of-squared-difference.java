class Solution {
    public long minSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2) {
        int[] differences = new int[nums1.length];
        int maximumDifference = 0;
        long totalDifference = 0;
        long operations = (long) k1 + k2;
        for (int index = 0; index < differences.length; index++) {
            differences[index] = Math.abs(nums1[index] - nums2[index]);
            maximumDifference = Math.max(maximumDifference, differences[index]);
            totalDifference += differences[index];
        }
        if (operations >= totalDifference) {
            return 0;
        }
        int left = 0;
        int right = maximumDifference;
        while (left < right) {
            int middle = (left + right) / 2;
            long required = 0;
            for (int difference : differences) {
                required += Math.max(0, difference - middle);
            }
            if (required <= operations) {
                right = middle;
            } else {
                left = middle + 1;
            }
        }
        long spent = 0;
        long squaredSum = 0;
        for (int difference : differences) {
            spent += Math.max(0, difference - left);
            long remainingDifference = Math.min(difference, left);
            squaredSum += remainingDifference * remainingDifference;
        }
        return squaredSum - (operations - spent) * (2L * left - 1);
    }
}
