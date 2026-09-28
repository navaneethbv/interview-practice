class Solution {
    public int largestMagicSquare(int[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[][] rowPrefix = new int[rows][columns + 1];
        int[][] columnPrefix = new int[rows + 1][columns];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                rowPrefix[row][column + 1] = rowPrefix[row][column] + grid[row][column];
                columnPrefix[row + 1][column] = columnPrefix[row][column] + grid[row][column];
            }
        }
        for (int size = Math.min(rows, columns); size > 1; size--) {
            for (int row = 0; row + size <= rows; row++) {
                for (int column = 0; column + size <= columns; column++) {
                    if (isMagic(grid, rowPrefix, columnPrefix, row, column, size)) {
                        return size;
                    }
                }
            }
        }
        return 1;
    }

    private boolean isMagic(int[][] grid, int[][] rowPrefix, int[][] columnPrefix,
            int row, int column, int size) {
        int target = rowPrefix[row][column + size] - rowPrefix[row][column];
        for (int offset = 0; offset < size; offset++) {
            if (rowPrefix[row + offset][column + size] - rowPrefix[row + offset][column] != target
                    || columnPrefix[row + size][column + offset] - columnPrefix[row][column + offset] != target) {
                return false;
            }
        }
        int firstDiagonal = 0;
        int secondDiagonal = 0;
        for (int offset = 0; offset < size; offset++) {
            firstDiagonal += grid[row + offset][column + offset];
            secondDiagonal += grid[row + offset][column + size - 1 - offset];
        }
        return firstDiagonal == target && secondDiagonal == target;
    }
}
