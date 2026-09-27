class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int size = grid.length;
        if (grid[0][0] != 0 || grid[size - 1][size - 1] != 0) {
            return -1;
        }
        boolean[][] seen = new boolean[size][size];
        Deque<int[]> queue = new ArrayDeque<>();
        seen[0][0] = true;
        queue.add(new int[]{0, 0, 1});
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            if (cell[0] == size - 1 && cell[1] == size - 1) {
                return cell[2];
            }
            enqueueNeighbors(grid, seen, queue, cell);
        }
        return -1;
    }

    private void enqueueNeighbors(int[][] grid, boolean[][] seen, Deque<int[]> queue, int[] cell) {
        for (int row = Math.max(0, cell[0] - 1); row < Math.min(grid.length, cell[0] + 2); row++) {
            for (int column = Math.max(0, cell[1] - 1); column < Math.min(grid.length, cell[1] + 2); column++) {
                if (!seen[row][column] && grid[row][column] == 0) {
                    seen[row][column] = true;
                    queue.add(new int[]{row, column, cell[2] + 1});
                }
            }
        }
    }
}
