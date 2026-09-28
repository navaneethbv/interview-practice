class Solution {
    public boolean containsCycle(char[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        boolean[][] seen = new boolean[rows][columns];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (seen[row][column]) {
                    continue;
                }
                if (containsCycleFrom(grid, row, column, seen)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean containsCycleFrom(char[][] grid, int row, int column, boolean[][] seen) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[] directions = {-1, 0, 1, 0, -1};
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{row, column, -1, -1});
        seen[row][column] = true;
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            for (int direction = 0; direction < 4; direction++) {
                int nextRow = cell[0] + directions[direction];
                int nextColumn = cell[1] + directions[direction + 1];
                boolean inside = nextRow >= 0 && nextRow < rows
                        && nextColumn >= 0 && nextColumn < columns;
                boolean sameValue = inside && grid[nextRow][nextColumn] == grid[cell[0]][cell[1]];
                boolean isParent = nextRow == cell[2] && nextColumn == cell[3];
                if (!sameValue || isParent) {
                    continue;
                }
                if (seen[nextRow][nextColumn]) {
                    return true;
                }
                seen[nextRow][nextColumn] = true;
                stack.push(new int[]{nextRow, nextColumn, cell[0], cell[1]});
            }
        }
        return false;
    }
}
