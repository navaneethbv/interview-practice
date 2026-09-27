class Solution {
    private final Set<String> visited = new HashSet<>();
    private final int[][] directions = {
        {-1, 0},
        {0, 1},
        {1, 0},
        {0, -1}
    };

    public void cleanRoom(Robot robot) {
        visited.clear();
        explore(robot, 0, 0, 0);
    }

    private void explore(Robot robot, int row, int column, int facing) {
        visited.add(key(row, column));
        robot.clean();

        for (int offset = 0; offset < 4; offset++) {
            int direction = (facing + offset) % 4;
            int nextRow = row + directions[direction][0];
            int nextColumn = column + directions[direction][1];
            String nextKey = key(nextRow, nextColumn);

            if (!visited.contains(nextKey) && robot.move()) {
                explore(robot, nextRow, nextColumn, direction);
                returnToCell(robot);
            }
            robot.turnRight();
        }
    }

    private String key(int row, int column) {
        return row + ":" + column;
    }

    private void returnToCell(Robot robot) {
        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnRight();
        robot.turnRight();
    }
}
