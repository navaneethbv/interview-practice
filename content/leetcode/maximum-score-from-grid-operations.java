class Solution {
    private static final long NEGATIVE = -1_000_000_000_000_000L;
    public long maximumScore(int[][] grid) {
        int size = grid.length;
        long[][] states = initialStates(size);
        for (int column = 0; column < size; column++) {
            long[] prefix = columnPrefix(grid, column);
            int limit = column < size - 1 ? size + 1 : 1;
            states = nextStates(states, prefix, limit);
        }
        long answer = 0;
        for (long[] row : states) {
            answer = Math.max(answer, row[0]);
        }
        return answer;
    }
    private long[][] initialStates(int size) {
        long[][] states = new long[size + 1][size + 1];
        for (long[] row : states) {
            Arrays.fill(row, NEGATIVE);
        }
        Arrays.fill(states[0], 0);
        return states;
    }
    private long[] columnPrefix(int[][] grid, int column) {
        long[] prefix = new long[grid.length + 1];
        for (int row = 0; row < grid.length; row++) {
            prefix[row + 1] = prefix[row] + grid[row][column];
        }
        return prefix;
    }
    private long[][] nextStates(long[][] states, long[] prefix, int limit) {
        int size = prefix.length - 1;
        long[][] next = new long[size + 1][size + 1];
        for (long[] row : next) {
            Arrays.fill(row, NEGATIVE);
        }
        for (int previous = 0; previous <= size; previous++) {
            long[] bestPrefix = bestPrefixes(states, previous);
            long[] bestSuffix = bestSuffixes(states, prefix, previous);
            for (int current = 0; current < limit; current++) {
                long gain = Math.max(0, prefix[current] - prefix[previous]);
                next[previous][current] = Math.max(
                bestPrefix[current] + gain, bestSuffix[current + 1]);
            }
        }
        return next;
    }
    private long[] bestPrefixes(long[][] states, int previous) {
        long[] result = new long[states.length];
        long best = NEGATIVE;
        for (int start = 0; start < states.length; start++) {
            best = Math.max(best, states[start][previous]);
            result[start] = best;
        }
        return result;
    }
    private long[] bestSuffixes(long[][] states, long[] prefix, int previous) {
        int size = prefix.length - 1;
        long[] result = new long[size + 2];
        Arrays.fill(result, NEGATIVE);
        for (int start = size; start >= 0; start--) {
            long gain = Math.max(0, prefix[start] - prefix[previous]);
            result[start] = Math.max(result[start + 1],
            states[start][previous] + gain);
        }
        return result;
    }
}
