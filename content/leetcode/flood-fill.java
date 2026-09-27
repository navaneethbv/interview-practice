class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int originalColor = image[sr][sc];
        if (originalColor == color) {
            return image;
        }
        Deque<int[]> pending = new ArrayDeque<>();
        pending.add(new int[] {sr, sc});
        image[sr][sc] = color;
        int[] rowDirections = {-1, 0, 1, 0};
        int[] columnDirections = {0, 1, 0, -1};
        while (!pending.isEmpty()) {
            int[] cell = pending.remove();
            for (int direction = 0; direction < 4; direction++) {
                int nextRow = cell[0] + rowDirections[direction];
                int nextColumn = cell[1] + columnDirections[direction];
                if (isOriginalPixel(image, nextRow, nextColumn, originalColor)) {
                    image[nextRow][nextColumn] = color;
                    pending.add(new int[] {nextRow, nextColumn});
                }
            }
        }
        return image;
    }

    private boolean isOriginalPixel(int[][] image, int row, int column, int color) {
        return row >= 0 && row < image.length
                && column >= 0 && column < image[0].length
                && image[row][column] == color;
    }
}
