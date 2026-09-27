class Solution {
    private long gcd(long first, long second) {
        while (second != 0) {
            long remainder = first % second;
            first = second;
            second = remainder;
        }
        return first;
    }

    public long minimumTime(int[] d, int[] r) {
        long totalDeliveries = d[0] + (long) d[1];
        long leastCommonMultiple = (long) r[0] * r[1] / gcd(r[0], r[1]);
        long left = 0;
        long right = 2 * totalDeliveries;
        while (left < right) {
            long middle = (left + right) / 2;
            long firstAvailable = middle - middle / r[0];
            long secondAvailable = middle - middle / r[1];
            long sharedAvailable = middle - middle / leastCommonMultiple;
            boolean feasible = firstAvailable >= d[0]
                    && secondAvailable >= d[1]
                    && sharedAvailable >= totalDeliveries;
            if (feasible) {
                right = middle;
            } else {
                left = middle + 1;
            }
        }
        return left;
    }
}
