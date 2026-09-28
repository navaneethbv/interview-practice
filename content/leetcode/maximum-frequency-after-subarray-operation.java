class Solution {
    public int maxFrequency(int[] nums, int k) {
        int baseline = 0;
        for (int value : nums) {
            if (value == k) {
                baseline++;
            }
        }
        int bestGain = 0;
        for (int source = 1; source <= 50; source++) {
            if (source == k) {
                continue;
            }
            int currentGain = 0;
            for (int value : nums) {
                if (value == source) {
                    currentGain++;
                }
                if (value == k) {
                    currentGain--;
                }
                currentGain = Math.max(0, currentGain);
                bestGain = Math.max(bestGain, currentGain);
            }
        }
        return baseline + bestGain;
    }
}
