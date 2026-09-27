class Solution {
    public int maxEvents(int[][] events) {
        Arrays.sort(events, Comparator.comparingInt(event -> event[0]));
        PriorityQueue<Integer> endDays = new PriorityQueue<>();
        int index = 0;
        int day = 0;
        int attended = 0;
        while (index < events.length || !endDays.isEmpty()) {
            if (endDays.isEmpty()) {
                day = Math.max(day, events[index][0]);
            }
            while (index < events.length && events[index][0] <= day) {
                endDays.offer(events[index][1]);
                index++;
            }
            while (!endDays.isEmpty() && endDays.peek() < day) {
                endDays.poll();
            }
            if (!endDays.isEmpty()) {
                endDays.poll();
                attended++;
            }
            day++;
        }
        return attended;
    }
}
