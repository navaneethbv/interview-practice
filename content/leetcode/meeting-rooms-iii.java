class Solution {
    public int mostBooked(int n, int[][] meetings) {
        Arrays.sort(meetings, Comparator.comparingInt(meeting -> meeting[0]));
        PriorityQueue<Integer> freeRooms = new PriorityQueue<>();
        for (int room = 0; room < n; room++) {
            freeRooms.add(room);
        }
        PriorityQueue<long[]> busyRooms = new PriorityQueue<>((first, second) -> {
            if (first[0] != second[0]) {
                return Long.compare(first[0], second[0]);
            }
            return Long.compare(first[1], second[1]);
        });
        int[] bookings = new int[n];
        for (int[] meeting : meetings) {
            while (!busyRooms.isEmpty() && busyRooms.peek()[0] <= meeting[0]) {
                freeRooms.add((int) busyRooms.remove()[1]);
            }
            int room;
            long finish;
            if (!freeRooms.isEmpty()) {
                room = freeRooms.remove();
                finish = meeting[1];
            } else {
                long[] earliest = busyRooms.remove();
                room = (int) earliest[1];
                finish = earliest[0] + meeting[1] - meeting[0];
            }
            bookings[room]++;
            busyRooms.add(new long[]{finish, room});
        }
        int best = 0;
        for (int room = 1; room < n; room++) {
            if (bookings[room] > bookings[best]) {
                best = room;
            }
        }
        return best;
    }
}
