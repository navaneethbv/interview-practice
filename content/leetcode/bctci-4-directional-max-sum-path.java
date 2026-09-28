class Solution {
    private static final int[][] STEPS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    private int best = Integer.MIN_VALUE;

    public int maxSimplePathSum(int[][] grid) {
        boolean[][] visited = new boolean[grid.length][grid[0].length];
        visited[0][0] = true;
        walk(grid, visited, 0, 0, grid[0][0]);
        return best;
    }

    private void walk(int[][] grid, boolean[][] visited, int r, int c, int total) {
        if (r == grid.length - 1 && c == grid[0].length - 1) {
            best = Math.max(best, total);
            return;
        }
        for (int[] step : STEPS) {
            int nr = r + step[0];
            int nc = c + step[1];
            if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && !visited[nr][nc]) {
                visited[nr][nc] = true;
                walk(grid, visited, nr, nc, total + grid[nr][nc]);
                visited[nr][nc] = false;
            }
        }
    }
}
