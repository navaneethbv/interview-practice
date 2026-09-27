class Solution {
    public int minimumEffortPath(int[][] heights) {
        int rows = heights.length;
        int columns = heights[0].length;
        int[][] best = new int[rows][columns];
        for (int[] row : best) {
            Arrays.fill(row, Integer.MAX_VALUE);
        }
        best[0][0] = 0;
        PriorityQueue<int[]> pending = new PriorityQueue<>(Comparator.comparingInt(state -> state[0]));
        pending.add(new int[]{0, 0, 0});
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        while (!pending.isEmpty()) {
            int[] current = pending.remove();
            int effort = current[0];
            int row = current[1];
            int column = current[2];
            if (effort != best[row][column]) {
                continue;
            }
            if (row == rows - 1 && column == columns - 1) {
                return effort;
            }
            for (int[] direction : directions) {
                relax(heights, best, pending, current, row + direction[0], column + direction[1]);
            }
        }
        return 0;
    }

    private void relax(int[][] heights, int[][] best, PriorityQueue<int[]> pending,
                       int[] current, int nextRow, int nextColumn) {
        if (nextRow < 0 || nextRow >= heights.length || nextColumn < 0 || nextColumn >= heights[0].length) {
            return;
        }
        int difference = Math.abs(heights[current[1]][current[2]] - heights[nextRow][nextColumn]);
        int candidate = Math.max(current[0], difference);
        if (candidate < best[nextRow][nextColumn]) {
            best[nextRow][nextColumn] = candidate;
            pending.add(new int[]{candidate, nextRow, nextColumn});
        }
    }
}
