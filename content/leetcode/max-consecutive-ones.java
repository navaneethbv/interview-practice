class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int bestLength = 0;
        int currentLength = 0;

        for (int value : nums) {
            if (value == 1) {
                currentLength++;
                bestLength = Math.max(bestLength, currentLength);
            } else {
                currentLength = 0;
            }
        }

        return bestLength;
    }
}
