class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[0]));
        List<int[]> result = new ArrayList<>();
        for (int[] interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            if (!result.isEmpty() && start <= result.get(result.size() - 1)[1]) {
                int[] previous = result.get(result.size() - 1);
                previous[1] = Math.max(previous[1], end);
            } else {
                result.add(new int[] {start, end});
            }
        }
        return result.toArray(new int[0][]);
    }
}
