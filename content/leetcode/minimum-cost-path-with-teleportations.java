class Solution {
    private void relaxMoves(int[][] grid, long[][] distance) {
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid[0].length; column++) {
                if (row > 0) {
                    distance[row][column] = Math.min(
                            distance[row][column], distance[row - 1][column] + grid[row][column]);
                }
                if (column > 0) {
                    distance[row][column] = Math.min(
                            distance[row][column], distance[row][column - 1] + grid[row][column]);
                }
            }
        }
    }

    public int minCost(int[][] grid, int k) {
        int rows = grid.length;
        int columns = grid[0].length;
        long infinity = Long.MAX_VALUE / 4;
        long[][] distance = new long[rows][columns];
        for (long[] row : distance) {
            Arrays.fill(row, infinity);
        }
        distance[0][0] = 0;
        relaxMoves(grid, distance);

        for (int iteration = 0; iteration < k; iteration++) {
            TreeMap<Integer, Long> bestAtLevel = new TreeMap<>(Comparator.reverseOrder());
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    bestAtLevel.merge(grid[row][column], distance[row][column], Math::min);
                }
            }
            long bestSoFar = infinity;
            for (Map.Entry<Integer, Long> entry : bestAtLevel.entrySet()) {
                bestSoFar = Math.min(bestSoFar, entry.getValue());
                entry.setValue(bestSoFar);
            }
            long[][] nextDistance = new long[rows][columns];
            for (int row = 0; row < rows; row++) {
                for (int column = 0; column < columns; column++) {
                    nextDistance[row][column] = bestAtLevel.get(grid[row][column]);
                }
            }
            relaxMoves(grid, nextDistance);
            distance = nextDistance;
        }
        return (int) distance[rows - 1][columns - 1];
    }
}
