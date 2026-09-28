class Solution {
    public int maxPathSum(int[][] grid) {
        int[] best = new int[grid[0].length];
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                int fromLeft = c > 0 ? best[c - 1] : 0;
                int fromAbove = r > 0 ? best[c] : 0;
                best[c] = grid[r][c] + Math.max(fromLeft, fromAbove);
            }
        }
        return best[best.length - 1];
    }
}
