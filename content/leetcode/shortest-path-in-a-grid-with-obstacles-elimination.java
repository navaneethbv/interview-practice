class Solution {
    public int shortestPath(int[][] grid, int k) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[][] best = new int[rows][columns];
        for (int[] row : best) {
            Arrays.fill(row, -1);
        }
        Deque<int[]> queue = new ArrayDeque<>();
        best[0][0] = k;
        queue.add(new int[]{0, 0, k, 0});
        int[] directions = {-1, 0, 1, 0, -1};
        while (!queue.isEmpty()) {
            int[] state = queue.remove();
            if (state[0] == rows - 1 && state[1] == columns - 1) {
                return state[3];
            }
            addNeighbors(grid, best, queue, directions, state);
        }
        return -1;
    }

    private void addNeighbors(int[][] grid, int[][] best, Deque<int[]> queue,
                              int[] directions, int[] state) {
        for (int direction = 0; direction < 4; direction++) {
            int row = state[0] + directions[direction];
            int column = state[1] + directions[direction + 1];
            if (!inside(grid, row, column)) {
                continue;
            }
            int remaining = state[2] - grid[row][column];
            if (remaining < 0 || remaining <= best[row][column]) {
                continue;
            }
            best[row][column] = remaining;
            queue.add(new int[]{row, column, remaining, state[3] + 1});
        }
    }

    private boolean inside(int[][] grid, int row, int column) {
        return row >= 0 && row < grid.length && column >= 0 && column < grid[0].length;
    }
}
