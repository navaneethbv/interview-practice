class Solution {
    public int[] missingTwo(int[] nums) {
        long n = nums.length + 2L;
        long missingSum = n * (n + 1) / 2;
        for (int value : nums) {
            missingSum -= value;
        }
        long pivot = missingSum / 2;
        long smaller = pivot * (pivot + 1) / 2;
        for (int value : nums) {
            if (value <= pivot) {
                smaller -= value;
            }
        }
        return new int[] {(int) smaller, (int) (missingSum - smaller)};
    }
}
