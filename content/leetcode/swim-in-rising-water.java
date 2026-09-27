class Solution {
    public int swimInWater(int[][] grid) {
        int size = grid.length;
        boolean[][] visited = new boolean[size][size];
        PriorityQueue<int[]> queue =
                new PriorityQueue<>(Comparator.comparingInt(entry -> entry[0]));
        queue.add(new int[]{grid[0][0], 0, 0});

        while (!queue.isEmpty()) {
            int[] current = queue.remove();
            int waterLevel = current[0];
            int row = current[1];
            int column = current[2];
            if (visited[row][column]) {
                continue;
            }
            visited[row][column] = true;

            if (row == size - 1 && column == size - 1) {
                return waterLevel;
            }

            addNeighbor(grid, queue, visited, waterLevel, row - 1, column);
            addNeighbor(grid, queue, visited, waterLevel, row + 1, column);
            addNeighbor(grid, queue, visited, waterLevel, row, column - 1);
            addNeighbor(grid, queue, visited, waterLevel, row, column + 1);
        }

        return -1;
    }

    private void addNeighbor(
            int[][] grid,
            PriorityQueue<int[]> queue,
            boolean[][] visited,
            int waterLevel,
            int row,
            int column) {
        if (row >= 0
                && row < grid.length
                && column >= 0
                && column < grid.length
                && !visited[row][column]) {
            queue.add(new int[]{
                Math.max(waterLevel, grid[row][column]),
                row,
                column
            });
        }
    }
}
