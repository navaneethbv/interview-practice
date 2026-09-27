class Solution {
    public int maxProductPath(int[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        long[][] minimum = new long[rows][columns];
        long[][] maximum = new long[rows][columns];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                fillCell(grid, minimum, maximum, row, column);
            }
        }
        long result = maximum[rows - 1][columns - 1];
        return result < 0 ? -1 : (int) (result % 1000000007);
    }

    private void fillCell(int[][] grid, long[][] minimum, long[][] maximum,
            int row, int column) {
        long value = grid[row][column];
        if (row == 0 && column == 0) {
            minimum[row][column] = value;
            maximum[row][column] = value;
            return;
        }
        long low = Long.MAX_VALUE;
        long high = Long.MIN_VALUE;
        if (row > 0) {
            low = Math.min(low, Math.min(value * minimum[row - 1][column],
                    value * maximum[row - 1][column]));
            high = Math.max(high, Math.max(value * minimum[row - 1][column],
                    value * maximum[row - 1][column]));
        }
        if (column > 0) {
            low = Math.min(low, Math.min(value * minimum[row][column - 1],
                    value * maximum[row][column - 1]));
            high = Math.max(high, Math.max(value * minimum[row][column - 1],
                    value * maximum[row][column - 1]));
        }
        minimum[row][column] = low;
        maximum[row][column] = high;
    }
}
