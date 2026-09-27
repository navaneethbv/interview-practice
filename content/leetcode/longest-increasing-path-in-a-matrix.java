class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        int rows = matrix.length;
        int columns = matrix[0].length;
        int[][] indegree = buildIndegree(matrix, rows, columns);
        Deque<int[]> queue = initialSources(indegree, rows, columns);
        int[] rowSteps = {-1, 0, 1, 0};
        int[] columnSteps = {0, 1, 0, -1};

        int pathLength = 0;
        while (!queue.isEmpty()) {
            pathLength++;
            int levelSize = queue.size();
            for (int count = 0; count < levelSize; count++) {
                releaseLargerNeighbors(
                        matrix, indegree, queue, rowSteps, columnSteps
                );
            }
        }
        return pathLength;
    }

    private int[][] buildIndegree(int[][] matrix, int rows, int columns) {
        int[][] indegree = new int[rows][columns];
        int[] rowSteps = {-1, 0, 1, 0};
        int[] columnSteps = {0, 1, 0, -1};
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                indegree[row][column] = countSmallerNeighbors(
                        matrix, row, column, rowSteps, columnSteps
                );
            }
        }
        return indegree;
    }

    private int countSmallerNeighbors(
            int[][] matrix, int row, int column, int[] rowSteps, int[] columnSteps
    ) {
        int count = 0;
        for (int direction = 0; direction < 4; direction++) {
            int neighborRow = row + rowSteps[direction];
            int neighborColumn = column + columnSteps[direction];
            if (isInside(neighborRow, neighborColumn, matrix.length, matrix[0].length)
                    && matrix[neighborRow][neighborColumn] < matrix[row][column]) {
                count++;
            }
        }
        return count;
    }

    private Deque<int[]> initialSources(int[][] indegree, int rows, int columns) {
        Deque<int[]> queue = new ArrayDeque<>();
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (indegree[row][column] == 0) {
                    queue.add(new int[]{row, column});
                }
            }
        }
        return queue;
    }

    private void releaseLargerNeighbors(
            int[][] matrix,
            int[][] indegree,
            Deque<int[]> queue,
            int[] rowSteps,
            int[] columnSteps
    ) {
        int[] cell = queue.remove();
        for (int direction = 0; direction < 4; direction++) {
            int neighborRow = cell[0] + rowSteps[direction];
            int neighborColumn = cell[1] + columnSteps[direction];
            if (isInside(neighborRow, neighborColumn, matrix.length, matrix[0].length)
                    && matrix[neighborRow][neighborColumn] > matrix[cell[0]][cell[1]]) {
                indegree[neighborRow][neighborColumn]--;
                if (indegree[neighborRow][neighborColumn] == 0) {
                    queue.add(new int[]{neighborRow, neighborColumn});
                }
            }
        }
    }

    private boolean isInside(int row, int column, int rows, int columns) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
