class Solution {
    public int trapRainWater(int[][] heightMap) {
        int rows = heightMap.length;
        int columns = heightMap[0].length;
        boolean[][] visited = new boolean[rows][columns];
        PriorityQueue<int[]> boundary = new PriorityQueue<>(
                (first, second) -> Integer.compare(first[0], second[0]));

        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (row == 0 || row == rows - 1
                        || column == 0 || column == columns - 1) {
                    visited[row][column] = true;
                    boundary.add(new int[]{heightMap[row][column], row, column});
                }
            }
        }

        int trapped = 0;
        int[] directions = {-1, 0, 1, 0, -1};
        while (!boundary.isEmpty()) {
            int[] cell = boundary.remove();
            for (int direction = 0; direction < 4; direction++) {
                int nextRow = cell[1] + directions[direction];
                int nextColumn = cell[2] + directions[direction + 1];
                if (nextRow >= 0 && nextRow < rows
                        && nextColumn >= 0 && nextColumn < columns
                        && !visited[nextRow][nextColumn]) {
                    visited[nextRow][nextColumn] = true;
                    trapped += Math.max(0, cell[0] - heightMap[nextRow][nextColumn]);
                    boundary.add(new int[]{
                            Math.max(cell[0], heightMap[nextRow][nextColumn]),
                            nextRow, nextColumn});
                }
            }
        }
        return trapped;
    }
}
