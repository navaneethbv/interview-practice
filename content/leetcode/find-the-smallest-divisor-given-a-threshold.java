class Solution {
    public int smallestDivisor(int[] nums, int threshold) {
        int left = 1;
        int right = Arrays.stream(nums).max().getAsInt();
        while (left < right) {
            int middle = (left + right) / 2;
            long roundedSum = 0;
            for (int value : nums) {
                roundedSum += (value + middle - 1) / middle;
            }
            if (roundedSum <= threshold) {
                right = middle;
            } else {
                left = middle + 1;
            }
        }
        return left;
    }
}
