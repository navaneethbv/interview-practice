class Solution {
    public int maxNonOverlapping(int[][] intervals) {
        int[][] ordered = intervals.clone();
        Arrays.sort(ordered, Comparator.comparingInt(interval -> interval[1]));
        int chosen = 0;
        long lastEnd = -1;
        for (int[] interval : ordered) {
            if (interval[0] > lastEnd) {
                chosen++;
                lastEnd = interval[1];
            }
        }
        return chosen;
    }
}
