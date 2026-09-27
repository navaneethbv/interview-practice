class Solution {
    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        int rows = maze.length;
        int columns = maze[0].length;
        boolean[][] visited = new boolean[rows][columns];
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{start[0], start[1]});
        visited[start[0]][start[1]] = true;
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!stack.isEmpty()) {
            int[] position = stack.pop();
            if (position[0] == destination[0] && position[1] == destination[1]) {
                return true;
            }
            addStops(maze, visited, stack, position, directions);
        }
        return false;
    }

    private void addStops(int[][] maze, boolean[][] visited, Deque<int[]> stack,
                          int[] position, int[][] directions) {
        for (int[] direction : directions) {
            int row = position[0];
            int column = position[1];
            while (canRoll(maze, row + direction[0], column + direction[1])) {
                row += direction[0];
                column += direction[1];
            }
            if (!visited[row][column]) {
                visited[row][column] = true;
                stack.push(new int[]{row, column});
            }
        }
    }

    private boolean canRoll(int[][] maze, int row, int column) {
        return row >= 0 && row < maze.length && column >= 0
                && column < maze[0].length && maze[row][column] == 0;
    }
}
