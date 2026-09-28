class Solution {
    public int[][] subgridMaximums(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] best = new int[rows][];
        for (int r = 0; r < rows; r++) {
            best[r] = grid[r].clone();
        }
        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 0; c--) {
                if (r + 1 < rows) {
                    best[r][c] = Math.max(best[r][c], best[r + 1][c]);
                }
                if (c + 1 < cols) {
                    best[r][c] = Math.max(best[r][c], best[r][c + 1]);
                }
            }
        }
        return best;
    }
}
