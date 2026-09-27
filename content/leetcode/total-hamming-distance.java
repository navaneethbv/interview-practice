class Solution {
    public int totalHammingDistance(int[] nums) {
        int totalDistance = 0;
        for (int bit = 0; bit < 30; bit++) {
            int ones = 0;
            for (int number : nums) {
                ones += (number >> bit) & 1;
            }
            totalDistance += ones * (nums.length - ones);
        }
        return totalDistance;
    }
}
