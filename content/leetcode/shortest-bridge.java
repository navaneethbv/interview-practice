class Solution {
    private static final int[] DIRECTIONS = {-1, 0, 1, 0, -1};

    public int shortestBridge(int[][] grid) {
        boolean[][] seen = new boolean[grid.length][grid.length];
        Deque<int[]> queue = collectIsland(grid, seen);
        while (!queue.isEmpty()) {
            int[] cell = queue.remove();
            for (int direction = 0; direction < 4; direction++) {
                int row = cell[0] + DIRECTIONS[direction];
                int column = cell[1] + DIRECTIONS[direction + 1];
                if (!unvisited(seen, row, column)) {
                    continue;
                }
                if (grid[row][column] == 1) {
                    return cell[2];
                }
                seen[row][column] = true;
                queue.add(new int[]{row, column, cell[2] + 1});
            }
        }
        return -1;
    }

    private Deque<int[]> collectIsland(int[][] grid, boolean[][] seen) {
        int[] start = findLand(grid);
        Deque<int[]> pending = new ArrayDeque<>();
        Deque<int[]> island = new ArrayDeque<>();
        pending.add(start);
        seen[start[0]][start[1]] = true;
        while (!pending.isEmpty()) {
            int[] cell = pending.remove();
            island.add(new int[]{cell[0], cell[1], 0});
            for (int direction = 0; direction < 4; direction++) {
                int row = cell[0] + DIRECTIONS[direction];
                int column = cell[1] + DIRECTIONS[direction + 1];
                if (unvisited(seen, row, column) && grid[row][column] == 1) {
                    seen[row][column] = true;
                    pending.add(new int[]{row, column});
                }
            }
        }
        return island;
    }

    private int[] findLand(int[][] grid) {
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid.length; column++) {
                if (grid[row][column] == 1) {
                    return new int[]{row, column};
                }
            }
        }
        throw new IllegalArgumentException("The grid must contain two islands");
    }

    private boolean unvisited(boolean[][] seen, int row, int column) {
        return row >= 0 && row < seen.length && column >= 0 && column < seen.length
                && !seen[row][column];
    }
}
