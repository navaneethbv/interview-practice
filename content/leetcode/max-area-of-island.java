class Solution {
    private int collectIsland(int[][] grid, int startRow, int startColumn) {
        int rows = grid.length;
        int columns = grid[0].length;
        int area = 0;
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{startRow, startColumn});
        grid[startRow][startColumn] = 0;

        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            area++;
            int row = cell[0];
            int column = cell[1];

            addLandNeighbor(grid, stack, row - 1, column);
            addLandNeighbor(grid, stack, row + 1, column);
            addLandNeighbor(grid, stack, row, column - 1);
            addLandNeighbor(grid, stack, row, column + 1);
        }

        return area;
    }

    private void addLandNeighbor(
            int[][] grid,
            Deque<int[]> stack,
            int row,
            int column) {
        if (row >= 0
                && row < grid.length
                && column >= 0
                && column < grid[0].length
                && grid[row][column] == 1) {
            grid[row][column] = 0;
            stack.push(new int[]{row, column});
        }
    }

    public int maxAreaOfIsland(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) {
            return 0;
        }

        int bestArea = 0;
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid[0].length; column++) {
                if (grid[row][column] == 1) {
                    bestArea = Math.max(bestArea, collectIsland(grid, row, column));
                }
            }
        }
        return bestArea;
    }
}
