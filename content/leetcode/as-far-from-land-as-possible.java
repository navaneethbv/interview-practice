class Solution {
    public int maxDistance(int[][] grid) {
        int size = grid.length;
        boolean[][] seen = new boolean[size][size];
        Deque<int[]> queue = new ArrayDeque<>();
        seedLand(grid, seen, queue);
        if (queue.isEmpty() || queue.size() == size * size) {
            return -1;
        }
        int distance = -1;
        int[] directions = {-1, 0, 1, 0, -1};
        while (!queue.isEmpty()) {
            distance++;
            expandLayer(queue, seen, size, directions);
        }
        return distance;
    }

    private void seedLand(int[][] grid, boolean[][] seen, Deque<int[]> queue) {
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid.length; column++) {
                if (grid[row][column] == 1) {
                    seen[row][column] = true;
                    queue.add(new int[]{row, column});
                }
            }
        }
    }

    private void expandLayer(Deque<int[]> queue, boolean[][] seen, int size, int[] directions) {
        int layerSize = queue.size();
        while (layerSize-- > 0) {
            int[] cell = queue.remove();
            for (int direction = 0; direction < 4; direction++) {
                int nextRow = cell[0] + directions[direction];
                int nextColumn = cell[1] + directions[direction + 1];
                boolean inside = nextRow >= 0 && nextRow < size
                        && nextColumn >= 0 && nextColumn < size;
                if (inside && !seen[nextRow][nextColumn]) {
                    seen[nextRow][nextColumn] = true;
                    queue.add(new int[]{nextRow, nextColumn});
                }
            }
        }
    }
}
