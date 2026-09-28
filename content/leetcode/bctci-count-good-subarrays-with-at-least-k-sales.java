class Solution {
    public long countGoodWithAtLeastK(int[] sales, int k) {
        long total = 0;
        int runStart = 0;
        int left = 0;
        long window = 0;
        for (int right = 0; right < sales.length; right++) {
            if (sales[right] < 10) {
                runStart = right + 1;
                left = right + 1;
                window = 0;
                continue;
            }
            window += sales[right];
            while (left <= right && window - sales[left] >= k) {
                window -= sales[left++];
            }
            if (window >= k) {
                total += left - runStart + 1;
            }
        }
        return total;
    }
}
