class Solution {
    public int cherryPickup(int[][] grid) {
        int size = grid.length;
        int[][] previous = new int[size][size];
        for (int[] row : previous) {
            Arrays.fill(row, Integer.MIN_VALUE);
        }
        previous[0][0] = grid[0][0];

        for (int step = 1; step < 2 * size - 1; step++) {
            previous = advance(grid, previous, step, size);
        }
        return Math.max(0, previous[size - 1][size - 1]);
    }

    private int[][] advance(int[][] grid, int[][] previous, int step, int size) {
        int[][] current = emptyStates(size);
        for (int firstRow = 0; firstRow < size; firstRow++) {
            for (int secondRow = 0; secondRow < size; secondRow++) {
                current[firstRow][secondRow] = bestState(
                        grid, previous, step, firstRow, secondRow);
            }
        }
        return current;
    }

    private int[][] emptyStates(int size) {
        int[][] states = new int[size][size];
        for (int[] row : states) {
            Arrays.fill(row, Integer.MIN_VALUE);
        }
        return states;
    }

    private int bestState(int[][] grid, int[][] previous, int step, int firstRow, int secondRow) {
        int firstColumn = step - firstRow;
        int secondColumn = step - secondRow;
        if (!validCell(grid, firstRow, firstColumn) || !validCell(grid, secondRow, secondColumn)) {
            return Integer.MIN_VALUE;
        }
        int bestPrevious = bestPrevious(previous, firstRow, secondRow);
        if (bestPrevious == Integer.MIN_VALUE) {
            return Integer.MIN_VALUE;
        }
        int gain = grid[firstRow][firstColumn];
        if (firstRow != secondRow) {
            gain += grid[secondRow][secondColumn];
        }
        return bestPrevious + gain;
    }

    private boolean validCell(int[][] grid, int row, int column) {
        return row >= 0 && row < grid.length && column >= 0
                && column < grid.length && grid[row][column] >= 0;
    }

    private int bestPrevious(int[][] values, int firstRow, int secondRow) {
        int best = values[firstRow][secondRow];
        if (firstRow > 0) {
            best = Math.max(best, values[firstRow - 1][secondRow]);
        }
        if (secondRow > 0) {
            best = Math.max(best, values[firstRow][secondRow - 1]);
        }
        if (firstRow > 0 && secondRow > 0) {
            best = Math.max(best, values[firstRow - 1][secondRow - 1]);
        }
        return best;
    }
}
