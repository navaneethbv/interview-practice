class Solution {
    private static final int[] DIRECTIONS = {-1, 0, 1, 0, -1};

    public int largestIsland(int[][] grid) {
        Map<Integer, Integer> sizes = labelIslands(grid);
        int best = Collections.max(sizes.values());
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid.length; column++) {
                if (grid[row][column] == 0) {
                    best = Math.max(best, joinedSize(grid, sizes, row, column));
                }
            }
        }
        return best;
    }

    private Map<Integer, Integer> labelIslands(int[][] grid) {
        Map<Integer, Integer> sizes = new HashMap<>();
        sizes.put(0, 0);
        int label = 2;
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid.length; column++) {
                if (grid[row][column] == 1) {
                    sizes.put(label, labelIsland(grid, row, column, label));
                    label++;
                }
            }
        }
        return sizes;
    }

    private int labelIsland(int[][] grid, int row, int column, int label) {
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{row, column});
        grid[row][column] = label;
        int size = 0;
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            size++;
            for (int direction = 0; direction < 4; direction++) {
                int nextRow = cell[0] + DIRECTIONS[direction];
                int nextColumn = cell[1] + DIRECTIONS[direction + 1];
                if (inside(grid, nextRow, nextColumn) && grid[nextRow][nextColumn] == 1) {
                    grid[nextRow][nextColumn] = label;
                    stack.push(new int[]{nextRow, nextColumn});
                }
            }
        }
        return size;
    }

    private int joinedSize(int[][] grid, Map<Integer, Integer> sizes, int row, int column) {
        Set<Integer> nearby = new HashSet<>();
        for (int direction = 0; direction < 4; direction++) {
            int nextRow = row + DIRECTIONS[direction];
            int nextColumn = column + DIRECTIONS[direction + 1];
            if (inside(grid, nextRow, nextColumn)) {
                nearby.add(grid[nextRow][nextColumn]);
            }
        }
        int size = 1;
        for (int label : nearby) {
            size += sizes.get(label);
        }
        return size;
    }

    private boolean inside(int[][] grid, int row, int column) {
        return row >= 0 && row < grid.length && column >= 0 && column < grid.length;
    }
}
