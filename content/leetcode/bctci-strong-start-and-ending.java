class Solution {
    public int strongStartAndEnd(int[] sales, int k) {
        int n = sales.length;
        int totalBad = 0;
        for (int value : sales) {
            if (value < 10) {
                totalBad++;
            }
        }
        int mustKeep = totalBad - k;
        if (mustKeep <= 0) {
            return n;
        }
        int left = 0;
        int bad = 0;
        int shortest = n;
        for (int right = 0; right < n; right++) {
            if (sales[right] < 10) {
                bad++;
            }
            while (bad - (sales[left] < 10 ? 1 : 0) >= mustKeep) {
                if (sales[left] < 10) {
                    bad--;
                }
                left++;
            }
            if (bad >= mustKeep) {
                shortest = Math.min(shortest, right - left + 1);
            }
        }
        return n - shortest;
    }
}
