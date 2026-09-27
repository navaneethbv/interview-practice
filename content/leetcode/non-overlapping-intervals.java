class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[1]));
        int kept = 0;
        int end = Integer.MIN_VALUE;
        for (int[] interval : intervals) {
            if (interval[0] >= end) {
                end = interval[1];
                kept++;
            }
        }
        return intervals.length - kept;
    }
}
