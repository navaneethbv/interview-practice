class Solution {
    public boolean isRobotBounded(String instructions) {
        int x = 0;
        int y = 0;
        int direction = 0;
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        for (int index = 0; index < instructions.length(); index++) {
            char instruction = instructions.charAt(index);
            if (instruction == 'L') {
                direction = (direction + 3) % 4;
            } else if (instruction == 'R') {
                direction = (direction + 1) % 4;
            } else {
                x += directions[direction][0];
                y += directions[direction][1];
            }
        }
        return (x == 0 && y == 0) || direction != 0;
    }
}
