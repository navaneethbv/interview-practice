class Solution {
    public int overbookedSlots(int[] slots, int[][] bookings, int cap) {
        int count = 0;
        for (long total : totals(slots, bookings)) {
            if (total > cap) {
                count++;
            }
        }
        return count;
    }

    private long[] totals(int[] slots, int[][] bookings) {
        long[] delta = new long[slots.length + 1];
        for (int[] booking : bookings) {
            delta[booking[0]] += booking[2];
            delta[booking[1] + 1] -= booking[2];
        }
        long[] totals = new long[slots.length];
        long running = 0;
        for (int index = 0; index < slots.length; index++) {
            running += delta[index];
            totals[index] = slots[index] + running;
        }
        return totals;
    }
}
