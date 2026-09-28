class Solution {
    public long latestYear(int[] points, int k, int maxAging) {
        PriorityQueue<Long> jumped = new PriorityQueue<>();
        long jumpedTotal = 0;
        long best = (long) points[0] + maxAging;
        for (int j = 1; j < points.length; j++) {
            long gap = (long) points[j] - points[j - 1];
            jumped.add(gap);
            jumpedTotal += gap;
            if (jumped.size() > k) {
                jumpedTotal -= jumped.poll();
            }
            long aged = (long) points[j] - points[0] - jumpedTotal;
            if (aged <= maxAging) {
                best = Math.max(best, points[j] + maxAging - aged);
            }
        }
        return best;
    }
}
