class Solution {
    private static final int BITS = 32;

    public int flipBit(int n) {
        int current = 0;
        int previous = 0;
        int best = 1;
        for (int position = 0; position < BITS; position++) {
            if ((n & 1) == 1) {
                current++;
            } else {
                previous = (n & 2) == 0 ? 0 : current;
                current = 0;
            }
            best = Math.max(best, previous + current + 1);
            n >>>= 1;
        }
        return Math.min(best, BITS);
    }
}
