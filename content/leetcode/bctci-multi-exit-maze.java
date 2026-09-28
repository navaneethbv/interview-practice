class Solution {
    private static final int[][] STEPS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public int[][] exitDistances(String[] maze) {
        int rows = maze.length;
        int cols = maze[0].length();
        int[][] distance = new int[rows][cols];
        Deque<int[]> queue = new ArrayDeque<>();
        for (int r = 0; r < rows; r++) {
            Arrays.fill(distance[r], -1);
            for (int c = 0; c < cols; c++) {
                if (maze[r].charAt(c) == 'O') {
                    distance[r][c] = 0;
                    queue.add(new int[] {r, c});
                }
            }
        }
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            for (int[] step : STEPS) {
                int nr = cell[0] + step[0];
                int nc = cell[1] + step[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && maze[nr].charAt(nc) != 'X' && distance[nr][nc] == -1) {
                    distance[nr][nc] = distance[cell[0]][cell[1]] + 1;
                    queue.add(new int[] {nr, nc});
                }
            }
        }
        return distance;
    }
}
