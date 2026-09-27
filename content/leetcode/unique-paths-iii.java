class Solution {
    public int uniquePathsIII(int[][] grid) {
        int remaining = 0;
        int startRow = 0;
        int startColumn = 0;
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid[0].length; column++) {
                if (grid[row][column] != -1) {
                    remaining++;
                }
                if (grid[row][column] == 1) {
                    startRow = row;
                    startColumn = column;
                }
            }
        }
        return visit(grid, startRow, startColumn, remaining);
    }

    private int visit(int[][] grid, int row, int column, int remaining) {
        if (row < 0 || row >= grid.length || column < 0 || column >= grid[0].length) {
            return 0;
        }
        if (grid[row][column] == -1) {
            return 0;
        }
        if (grid[row][column] == 2) {
            return remaining == 1 ? 1 : 0;
        }
        int original = grid[row][column];
        grid[row][column] = -1;
        int total = visit(grid, row - 1, column, remaining - 1)
                + visit(grid, row + 1, column, remaining - 1)
                + visit(grid, row, column - 1, remaining - 1)
                + visit(grid, row, column + 1, remaining - 1);
        grid[row][column] = original;
        return total;
    }
}
