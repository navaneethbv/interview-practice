class Solution {
    public long countAtLeastKBad(int[] sales, int k) {
        return (long) sales.length * (sales.length + 1) / 2 - atMost(sales, k - 1L);
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
