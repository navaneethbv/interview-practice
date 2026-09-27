class MyCalendarTwo {
    private final List<int[]> bookings = new ArrayList<>();
    private final List<int[]> doubleBooked = new ArrayList<>();

    public boolean book(int startTime, int endTime) {
        for (int[] overlap : doubleBooked) {
            if (overlaps(startTime, endTime, overlap[0], overlap[1])) {
                return false;
            }
        }
        for (int[] booking : bookings) {
            int overlapStart = Math.max(startTime, booking[0]);
            int overlapEnd = Math.min(endTime, booking[1]);
            if (overlapStart < overlapEnd) {
                doubleBooked.add(new int[]{overlapStart, overlapEnd});
            }
        }
        bookings.add(new int[]{startTime, endTime});
        return true;
    }

    private boolean overlaps(int firstStart, int firstEnd, int secondStart, int secondEnd) {
        return Math.max(firstStart, secondStart) < Math.min(firstEnd, secondEnd);
    }
}
