class Solution {
    public int maxResult(int[] nums, int k) {
        Deque<int[]> best = new ArrayDeque<>();
        best.addLast(new int[]{0, nums[0]});
        int score = nums[0];
        for (int index = 1; index < nums.length; index++) {
            while (best.getFirst()[0] < index - k) {
                best.removeFirst();
            }
            score = nums[index] + best.getFirst()[1];
            while (!best.isEmpty() && best.getLast()[1] <= score) {
                best.removeLast();
            }
            best.addLast(new int[]{index, score});
        }
        return score;
    }
}
