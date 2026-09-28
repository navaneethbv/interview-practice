class Solution {
    private static final int[][] STEPS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    public int[][] rgbDistances(String[] screen) {
        int[][] toRed = distances(screen, 'R');
        int[][] toGreen = distances(screen, 'G');
        int[][] toBlue = distances(screen, 'B');
        int[][] result = new int[screen.length][screen[0].length()];
        for (int r = 0; r < screen.length; r++) {
            for (int c = 0; c < screen[0].length(); c++) {
                char pixel = screen[r].charAt(c);
                result[r][c] = pixel == 'R' ? toGreen[r][c] : pixel == 'G' ? toBlue[r][c] : toRed[r][c];
            }
        }
        return result;
    }

    private int[][] distances(String[] screen, char color) {
        int rows = screen.length;
        int cols = screen[0].length();
        int[][] distance = new int[rows][cols];
        Deque<int[]> queue = new ArrayDeque<>();
        for (int r = 0; r < rows; r++) {
            Arrays.fill(distance[r], -1);
            for (int c = 0; c < cols; c++) {
                if (screen[r].charAt(c) == color) {
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
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && distance[nr][nc] == -1) {
                    distance[nr][nc] = distance[cell[0]][cell[1]] + 1;
                    queue.add(new int[] {nr, nc});
                }
            }
        }
        return distance;
    }
}
