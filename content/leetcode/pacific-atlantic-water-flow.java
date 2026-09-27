class Solution {
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        boolean[][] pacific = reach(heights, true);
        boolean[][] atlantic = reach(heights, false);
        List<List<Integer>> result = new ArrayList<>();
        for (int row = 0; row < heights.length; row++) {
            for (int column = 0; column < heights[0].length; column++) {
                if (pacific[row][column] && atlantic[row][column]) {
                    result.add(Arrays.asList(row, column));
                }
            }
        }
        return result;
    }

    private boolean[][] reach(int[][] heights, boolean pacific) {
        int rows = heights.length;
        int columns = heights[0].length;
        boolean[][] seen = new boolean[rows][columns];
        Deque<int[]> queue = new ArrayDeque<>();
        for (int row = 0; row < rows; row++) {
            addCell(row, pacific ? 0 : columns - 1, seen, queue);
        }
        for (int column = 0; column < columns; column++) {
            addCell(pacific ? 0 : rows - 1, column, seen, queue);
        }
        flood(heights, seen, queue);
        return seen;
    }

    private void flood(int[][] heights, boolean[][] seen, Deque<int[]> queue) {
        while (!queue.isEmpty()) {
            int[] cell = queue.removeFirst();
            for (int[] direction : DIRECTIONS) {
                int row = cell[0] + direction[0];
                int column = cell[1] + direction[1];
                if (canClimb(heights, cell, row, column)) {
                    addCell(row, column, seen, queue);
                }
            }
        }
    }

    private boolean canClimb(int[][] heights, int[] cell, int row, int column) {
        return row >= 0 && row < heights.length && column >= 0 && column < heights[0].length
            && heights[row][column] >= heights[cell[0]][cell[1]];
    }

    private void addCell(int row, int column, boolean[][] seen, Deque<int[]> queue) {
        if (!seen[row][column]) {
            seen[row][column] = true;
            queue.addLast(new int[] {row, column});
        }
    }
}
