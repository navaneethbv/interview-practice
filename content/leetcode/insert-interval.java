class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int start = newInterval[0];
        int end = newInterval[1];
        boolean placed = false;
        for (int[] interval : intervals) {
            if (interval[1] < start) {
                result.add(interval.clone());
            } else if (interval[0] > end) {
                if (!placed) {
                    result.add(new int[] {start, end});
                    placed = true;
                }
                result.add(interval.clone());
            } else {
                start = Math.min(start, interval[0]);
                end = Math.max(end, interval[1]);
            }
        }
        if (!placed) {
            result.add(new int[] {start, end});
        }
        return result.toArray(new int[0][]);
    }
}
