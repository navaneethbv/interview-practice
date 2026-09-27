class Solution {
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public int numIslands(char[][] grid) {
        if (grid.length == 0) {
            return 0;
        }
        boolean[][] seen = new boolean[grid.length][grid[0].length];
        int islands = 0;
        for (int row = 0; row < grid.length; row++) {
            islands += countInRow(grid, row, seen);
        }
        return islands;
    }

    private int countInRow(char[][] grid, int row, boolean[][] seen) {
        int islands = 0;
        for (int column = 0; column < grid[row].length; column++) {
            if (isUnseenLand(grid, row, column, seen)) {
                islands++;
                flood(grid, row, column, seen);
            }
        }
        return islands;
    }

    private void flood(char[][] grid, int row, int column, boolean[][] seen) {
        Deque<int[]> queue = new ArrayDeque<>();
        queue.addLast(new int[] {row, column});
        seen[row][column] = true;
        while (!queue.isEmpty()) {
            int[] cell = queue.removeFirst();
            for (int[] direction : DIRECTIONS) {
                int nextRow = cell[0] + direction[0];
                int nextColumn = cell[1] + direction[1];
                if (isUnseenLand(grid, nextRow, nextColumn, seen)) {
                    seen[nextRow][nextColumn] = true;
                    queue.addLast(new int[] {nextRow, nextColumn});
                }
            }
        }
    }

    private boolean isUnseenLand(char[][] grid, int row, int column, boolean[][] seen) {
        return row >= 0 && row < grid.length && column >= 0 && column < grid[0].length
            && grid[row][column] == '1' && !seen[row][column];
    }
}
