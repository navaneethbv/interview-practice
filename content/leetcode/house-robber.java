class Solution {
    public int rob(int[] nums) {
        int older = 0;
        int previous = 0;
        for (int value : nums) {
            int next = Math.max(previous, older + value);
            older = previous;
            previous = next;
        }
        return previous;
    }
}
