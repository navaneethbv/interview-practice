class Solution {
    public boolean predictTheWinner(int[] nums) {
        int[] bestDifference = nums.clone();
        for (int length = 2; length <= nums.length; length++) {
            for (int left = 0; left + length <= nums.length; left++) {
                int right = left + length - 1;
                int takeLeft = nums[left] - bestDifference[left + 1];
                int takeRight = nums[right] - bestDifference[left];
                bestDifference[left] = Math.max(takeLeft, takeRight);
            }
        }
        return bestDifference[0] >= 0;
    }
}
