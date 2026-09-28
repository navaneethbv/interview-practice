class Solution {
    private static final long[] FACTORS = {3, 5, 7};

    public long getKthMagicNumber(int k) {
        long[] values = new long[k];
        values[0] = 1;
        int[] pointers = new int[FACTORS.length];
        for (int filled = 1; filled < k; filled++) {
            long smallest = Long.MAX_VALUE;
            for (int i = 0; i < FACTORS.length; i++) {
                smallest = Math.min(smallest, values[pointers[i]] * FACTORS[i]);
            }
            values[filled] = smallest;
            for (int i = 0; i < FACTORS.length; i++) {
                if (values[pointers[i]] * FACTORS[i] == smallest) {
                    pointers[i]++;
                }
            }
        }
        return values[k - 1];
    }
}
