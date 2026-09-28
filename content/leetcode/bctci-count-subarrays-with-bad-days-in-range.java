class Solution {
    public long countBadInRange(int[] sales, int k1, int k2) {
        return atMost(sales, k2) - atMost(sales, k1 - 1L);
    }

    private long atMost(int[] sales, long k) {
        if (k < 0) {
            return 0;
        }
        int left = 0;
        int bad = 0;
        long total = 0;
        for (int right = 0; right < sales.length; right++) {
            if (sales[right] < 10) {
                bad++;
            }
            while (bad > k) {
                if (sales[left++] < 10) {
                    bad--;
                }
            }
            total += right - left + 1;
        }
        return total;
    }
}
