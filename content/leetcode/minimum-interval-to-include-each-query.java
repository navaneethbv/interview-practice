class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[0]));
        Integer[] queryOrder = new Integer[queries.length];
        for (int index = 0; index < queries.length; index++) {
            queryOrder[index] = index;
        }
        Arrays.sort(queryOrder, Comparator.comparingInt(index -> queries[index]));

        int[] answers = new int[queries.length];
        Arrays.fill(answers, -1);
        PriorityQueue<int[]> activeIntervals = new PriorityQueue<>(
                Comparator.comparingInt(interval -> interval[0])
        );
        int intervalIndex = 0;

        for (int queryIndex : queryOrder) {
            int query = queries[queryIndex];
            while (intervalIndex < intervals.length
                    && intervals[intervalIndex][0] <= query) {
                int left = intervals[intervalIndex][0];
                int right = intervals[intervalIndex][1];
                activeIntervals.add(new int[]{right - left + 1, right});
                intervalIndex++;
            }
            while (!activeIntervals.isEmpty()
                    && activeIntervals.peek()[1] < query) {
                activeIntervals.remove();
            }
            if (!activeIntervals.isEmpty()) {
                answers[queryIndex] = activeIntervals.peek()[0];
            }
        }
        return answers;
    }
}
