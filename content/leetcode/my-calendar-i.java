class MyCalendar {
    private final List<int[]> bookings = new ArrayList<>();

    public boolean book(int startTime, int endTime) {
        for (int[] booking : bookings) {
            if (Math.max(startTime, booking[0]) < Math.min(endTime, booking[1])) {
                return false;
            }
        }
        bookings.add(new int[]{startTime, endTime});
        return true;
    }
}
