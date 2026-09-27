class Solution {
    public int numMagicSquaresInside(int[][] grid) {
        int count = 0;
        for (int rowStart = 0; rowStart + 2 < grid.length; rowStart++) {
            for (int columnStart = 0; columnStart + 2 < grid[0].length; columnStart++) {
                if (isMagicSquare(grid, rowStart, columnStart)) {
                    count++;
                }
            }
        }
        return count;
    }

    private boolean isMagicSquare(int[][] grid, int rowStart, int columnStart) {
        boolean[] seen = new boolean[10];
        for (int row = 0; row < 3; row++) {
            for (int column = 0; column < 3; column++) {
                int value = grid[rowStart + row][columnStart + column];
                if (value < 1 || value > 9 || seen[value]) {
                    return false;
                }
                seen[value] = true;
            }
        }
        for (int index = 0; index < 3; index++) {
            int rowSum = 0;
            int columnSum = 0;
            for (int offset = 0; offset < 3; offset++) {
                rowSum += grid[rowStart + index][columnStart + offset];
                columnSum += grid[rowStart + offset][columnStart + index];
            }
            if (rowSum != 15 || columnSum != 15) {
                return false;
            }
        }
        int mainDiagonal = grid[rowStart][columnStart]
            + grid[rowStart + 1][columnStart + 1]
            + grid[rowStart + 2][columnStart + 2];
        int otherDiagonal = grid[rowStart][columnStart + 2]
            + grid[rowStart + 1][columnStart + 1]
            + grid[rowStart + 2][columnStart];
        return mainDiagonal == 15 && otherDiagonal == 15;
    }
}
