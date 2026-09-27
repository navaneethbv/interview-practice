class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[0]));
        for (int index = 1; index < intervals.length; index++) {
            if (intervals[index - 1][1] > intervals[index][0]) {
                return false;
            }
        }
        return true;
    }
}
