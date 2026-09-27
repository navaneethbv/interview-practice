class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int rows = mat.length;
        int columns = mat[0].length;
        int[][] distance = new int[rows][columns];
        Deque<int[]> queue = new ArrayDeque<>();

        seedZeroCells(mat, distance, queue);

        int[] rowSteps = {-1, 0, 1, 0};
        int[] columnSteps = {0, 1, 0, -1};
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            for (int direction = 0; direction < 4; direction++) {
                int neighborRow = cell[0] + rowSteps[direction];
                int neighborColumn = cell[1] + columnSteps[direction];
                if (isInside(neighborRow, neighborColumn, rows, columns)
                        && distance[neighborRow][neighborColumn] == -1) {
                    distance[neighborRow][neighborColumn] =
                            distance[cell[0]][cell[1]] + 1;
                    queue.add(new int[]{neighborRow, neighborColumn});
                }
            }
        }
        return distance;
    }

    private void seedZeroCells(int[][] mat, int[][] distance, Deque<int[]> queue) {
        int rows = mat.length;
        int columns = mat[0].length;
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                distance[row][column] = mat[row][column] == 0 ? 0 : -1;
                if (distance[row][column] == 0) {
                    queue.add(new int[]{row, column});
                }
            }
        }

    }

    private boolean isInside(int row, int column, int rows, int columns) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
