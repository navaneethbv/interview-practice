class Solution {
    public int[] queryResults(int limit, int[][] queries) {
        Map<Integer, Integer> balls = new HashMap<>();
        Map<Integer, Integer> counts = new HashMap<>();
        int[] result = new int[queries.length];
        for (int index = 0; index < queries.length; index++) {
            int ball = queries[index][0];
            int color = queries[index][1];
            Integer oldColor = balls.put(ball, color);
            if (oldColor != null) {
                removeColor(counts, oldColor);
            }
            counts.merge(color, 1, Integer::sum);
            result[index] = counts.size();
        }
        return result;
    }

    private void removeColor(Map<Integer, Integer> counts, int color) {
        int remaining = counts.get(color) - 1;
        if (remaining == 0) {
            counts.remove(color);
        } else {
            counts.put(color, remaining);
        }
    }
}
