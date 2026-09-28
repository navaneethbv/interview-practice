class Solution {
    public int minTaps(int n, int[] ranges) {
        int[] farthestFrom = new int[n + 1];
        for (int tap = 0; tap <= n; tap++) {
            int left = Math.max(0, tap - ranges[tap]);
            int right = Math.min(n, tap + ranges[tap]);
            farthestFrom[left] = Math.max(farthestFrom[left], right);
        }

        int taps = 0;
        int coveredEnd = 0;
        int nextEnd = 0;
        for (int position = 0; position < n; position++) {
            nextEnd = Math.max(nextEnd, farthestFrom[position]);
            if (position == coveredEnd) {
                if (nextEnd <= position) {
                    return -1;
                }
                taps++;
                coveredEnd = nextEnd;
            }
        }
        return taps;
    }
}
