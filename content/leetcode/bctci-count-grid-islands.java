class Solution {
    private static final int[][] STEPS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public int countIslands(int[][] grid) {
        int islands = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[r].length; c++) {
                if (grid[r][c] == 1) {
                    islands++;
                    sink(grid, r, c);
                }
            }
        }
        return islands;
    }

    private void sink(int[][] grid, int r, int c) {
        Deque<int[]> stack = new ArrayDeque<>();
        grid[r][c] = 0;
        stack.push(new int[] {r, c});
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            for (int[] step : STEPS) {
                int nr = cell[0] + step[0];
                int nc = cell[1] + step[1];
                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[nr].length && grid[nr][nc] == 1) {
                    grid[nr][nc] = 0;
                    stack.push(new int[] {nr, nc});
                }
            }
        }
    }
}
