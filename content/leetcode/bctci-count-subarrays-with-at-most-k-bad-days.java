class Solution {
    public long countAtMostKBad(int[] sales, int k) {
        return atMost(sales, k);
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
