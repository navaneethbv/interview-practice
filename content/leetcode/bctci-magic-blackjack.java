class Solution {
    public long countBusts(int stand, int limit) {
        long[] busts = new long[stand];
        for (int total = stand - 1; total >= 0; total--) {
            long ways = 0;
            for (int card = 1; card <= 10; card++) {
                int next = total + card;
                if (next > limit) {
                    ways++;
                } else if (next < stand) {
                    ways += busts[next];
                }
            }
            busts[total] = ways;
        }
        return busts[0];
    }
}
