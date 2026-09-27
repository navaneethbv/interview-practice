class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) m * k > bloomDay.length) {
            return -1;
        }
        int low = Integer.MAX_VALUE;
        int high = 0;
        for (int day : bloomDay) {
            low = Math.min(low, day);
            high = Math.max(high, day);
        }
        while (low < high) {
            int day = low + (high - low) / 2;
            int consecutive = 0;
            int bouquets = 0;
            for (int bloom : bloomDay) {
                consecutive = bloom <= day ? consecutive + 1 : 0;
                if (consecutive == k) {
                    bouquets++;
                    consecutive = 0;
                }
            }
            if (bouquets >= m) {
                high = day;
            } else {
                low = day + 1;
            }
        }
        return low;
    }
}
