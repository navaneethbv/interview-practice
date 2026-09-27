class Solution {
    public int shortestDistance(int[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[][] distances = new int[rows][columns];
        int[][] reaches = new int[rows][columns];
        int buildings = 0;
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (grid[row][column] == 1) {
                    buildings++;
                    spreadFromBuilding(grid, row, column, distances, reaches);
                }
            }
        }
        int answer = Integer.MAX_VALUE;
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (grid[row][column] == 0 && reaches[row][column] == buildings) {
                    answer = Math.min(answer, distances[row][column]);
                }
            }
        }
        return answer == Integer.MAX_VALUE ? -1 : answer;
    }

    private void spreadFromBuilding(int[][] grid, int startRow, int startColumn,
            int[][] distances, int[][] reaches) {
        int rows = grid.length;
        int columns = grid[0].length;
        boolean[][] visited = new boolean[rows][columns];
        ArrayDeque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[]{startRow, startColumn, 0});
        visited[startRow][startColumn] = true;
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!queue.isEmpty()) {
            int[] current = queue.remove();
            for (int[] direction : directions) {
                int nextRow = current[0] + direction[0];
                int nextColumn = current[1] + direction[1];
                if (canVisit(grid, visited, nextRow, nextColumn)) {
                    visited[nextRow][nextColumn] = true;
                    int distance = current[2] + 1;
                    distances[nextRow][nextColumn] += distance;
                    reaches[nextRow][nextColumn]++;
                    queue.add(new int[]{nextRow, nextColumn, distance});
                }
            }
        }
    }

    private boolean canVisit(int[][] grid, boolean[][] visited, int row, int column) {
        return row >= 0 && row < grid.length && column >= 0 && column < grid[0].length
                && grid[row][column] == 0 && !visited[row][column];
    }
}
