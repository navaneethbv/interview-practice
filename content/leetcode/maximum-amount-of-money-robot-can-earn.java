class Solution {
    private static final int NEGATIVE = -1_000_000_000;

    public int maximumAmount(int[][] coins) {
        int rows = coins.length;
        int columns = coins[0].length;
        int[][][] dp = new int[rows][columns][3];
        fillWithNegative(dp);
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                for (int skipped = 0; skipped < 3; skipped++) {
                    enterCell(coins, dp, row, column, skipped);
                }
            }
        }
        return maximum(dp[rows - 1][columns - 1]);
    }

    private void fillWithNegative(int[][][] dp) {
        for (int[][] row : dp) {
            for (int[] cell : row) {
                Arrays.fill(cell, NEGATIVE);
            }
        }
    }

    private void enterCell(int[][] coins, int[][][] dp, int row, int column,
            int skipped) {
        int previous = bestPrevious(dp, row, column, skipped);
        int value = coins[row][column];
        dp[row][column][skipped] = Math.max(dp[row][column][skipped], previous + value);
        if (value < 0 && skipped < 2) {
            dp[row][column][skipped + 1] = Math.max(
                    dp[row][column][skipped + 1], previous);
        }
    }

    private int bestPrevious(int[][][] dp, int row, int column, int skipped) {
        if (row == 0 && column == 0) {
            return skipped == 0 ? 0 : NEGATIVE;
        }
        int best = NEGATIVE;
        if (row > 0) {
            best = Math.max(best, dp[row - 1][column][skipped]);
        }
        if (column > 0) {
            best = Math.max(best, dp[row][column - 1][skipped]);
        }
        return best;
    }

    private int maximum(int[] values) {
        return Math.max(values[0], Math.max(values[1], values[2]));
    }
}
