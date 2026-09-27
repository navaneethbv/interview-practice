class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0;
        int voteCount = 0;
        for (int value : nums) {
            if (voteCount == 0) {
                candidate = value;
            }
            voteCount += value == candidate ? 1 : -1;
        }
        return candidate;
    }
}
