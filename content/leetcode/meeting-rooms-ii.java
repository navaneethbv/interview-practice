class Solution {
    public int minMeetingRooms(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[0]));
        PriorityQueue<Integer> ends = new PriorityQueue<>();
        int best = 0;
        for (int[] interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            while (!ends.isEmpty() && ends.peek() <= start) {
                ends.remove();
            }
            ends.add(end);
            best = Math.max(best, ends.size());
        }
        return best;
    }
}
