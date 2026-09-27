class Solution {
    public int orangesRotting(int[][] grid) {
        int freshOranges = 0;
        Deque<int[]> queue = new ArrayDeque<>();

        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid[0].length; column++) {
                if (grid[row][column] == 2) {
                    queue.add(new int[]{row, column, 0});
                } else if (grid[row][column] == 1) {
                    freshOranges++;
                }
            }
        }

        int minutes = 0;
        while (!queue.isEmpty()) {
            int[] orange = queue.remove();
            int row = orange[0];
            int column = orange[1];
            minutes = orange[2];

            int rotted = rotNeighbors(grid, queue, row, column, minutes);
            freshOranges -= rotted;
            minutes = Math.max(minutes, orange[2]);
        }

        return freshOranges == 0 ? minutes : -1;
    }

    private int rotNeighbors(
            int[][] grid,
            Deque<int[]> queue,
            int row,
            int column,
            int minutes) {
        int nextMinutes = minutes + 1;
        int rotted = 0;
        rotted += addFreshOrange(grid, queue, row - 1, column, nextMinutes);
        rotted += addFreshOrange(grid, queue, row + 1, column, nextMinutes);
        rotted += addFreshOrange(grid, queue, row, column - 1, nextMinutes);
        rotted += addFreshOrange(grid, queue, row, column + 1, nextMinutes);
        return rotted;
    }

    private boolean isFresh(int[][] grid, int row, int column) {
        return row >= 0
                && row < grid.length
                && column >= 0
                && column < grid[0].length
                && grid[row][column] == 1;
    }

    private int addFreshOrange(
            int[][] grid,
            Deque<int[]> queue,
            int row,
            int column,
            int minutes) {
        if (isFresh(grid, row, column)) {
            grid[row][column] = 2;
            queue.add(new int[]{row, column, minutes});
            return 1;
        }
        return 0;
    }
}
