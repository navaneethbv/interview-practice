class Solution {
    public int minPathSum(int[][] grid) {
        int[] minimumCosts = new int[grid[0].length];
        Arrays.fill(minimumCosts, Integer.MAX_VALUE);
        minimumCosts[0] = 0;

        for (int[] row : grid) {
            for (int column = 0; column < row.length; column++) {
                int fromTop = minimumCosts[column];
                int fromLeft = column > 0 ? minimumCosts[column - 1] : Integer.MAX_VALUE;
                minimumCosts[column] = row[column] + Math.min(fromTop, fromLeft);
            }
        }

        return minimumCosts[minimumCosts.length - 1];
    }
}
