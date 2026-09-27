class Solution {
    public int getFood(char[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        Deque<int[]> pending = new ArrayDeque<>();
        boolean[][] seen = new boolean[rows][columns];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (grid[row][column] == '*') {
                    pending.add(new int[] {row, column, 0});
                    seen[row][column] = true;
                }
            }
        }
        int[] rowDirections = {-1, 0, 1, 0};
        int[] columnDirections = {0, 1, 0, -1};
        while (!pending.isEmpty()) {
            int[] cell = pending.remove();
            if (grid[cell[0]][cell[1]] == '#') {
                return cell[2];
            }
            addReachableNeighbors(grid, pending, seen, cell, rowDirections,
                    columnDirections);
        }
        return -1;
    }

    private void addReachableNeighbors(char[][] grid, Deque<int[]> pending,
                                       boolean[][] seen, int[] cell,
                                       int[] rowDirections, int[] columnDirections) {
        for (int direction = 0; direction < 4; direction++) {
            int nextRow = cell[0] + rowDirections[direction];
            int nextColumn = cell[1] + columnDirections[direction];
            if (nextRow >= 0 && nextRow < grid.length && nextColumn >= 0
                    && nextColumn < grid[0].length && !seen[nextRow][nextColumn]
                    && grid[nextRow][nextColumn] != 'X') {
                seen[nextRow][nextColumn] = true;
                pending.add(new int[] {nextRow, nextColumn, cell[2] + 1});
            }
        }
    }
}
