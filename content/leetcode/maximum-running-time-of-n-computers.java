class Solution {
    public long maxRunTime(int n, int[] batteries) {
        long left = 0;
        long right = 0;
        for (int battery : batteries) {
            right += battery;
        }
        right /= n;
        while (left < right) {
            long middle = (left + right + 1) / 2;
            long available = 0;
            for (int battery : batteries) {
                available += Math.min((long) battery, middle);
            }
            if (available >= n * middle) {
                left = middle;
            } else {
                right = middle - 1;
            }
        }
        return left;
    }
}
