class Solution {
    public int[][] subgridSums(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] sums = new int[rows + 1][cols + 1];
        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 0; c--) {
                sums[r][c] = grid[r][c] + sums[r + 1][c] + sums[r][c + 1] - sums[r + 1][c + 1];
            }
        }
        int[][] result = new int[rows][];
        for (int r = 0; r < rows; r++) {
            result[r] = Arrays.copyOf(sums[r], cols);
        }
        return result;
    }
}
