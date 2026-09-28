class Solution {
    public long countGoodStartEnd(int[] sales) {
        long good = 0;
        for (int value : sales) {
            if (value >= 10) {
                good++;
            }
        }
        return good * (good + 1) / 2;
    }
}
