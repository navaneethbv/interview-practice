class Solution {
    public int robotSim(int[] commands, int[][] obstacles) {
        Set<String> blocked = new HashSet<>();
        for (int[] obstacle : obstacles) {
            blocked.add(key(obstacle[0], obstacle[1]));
        }
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int directionIndex = 0;
        int row = 0;
        int column = 0;
        int bestDistance = 0;
        for (int command : commands) {
            if (command == -2) {
                directionIndex = (directionIndex + 3) % 4;
                continue;
            }
            if (command == -1) {
                directionIndex = (directionIndex + 1) % 4;
                continue;
            }
            for (int step = 0; step < command; step++) {
                int nextRow = row + directions[directionIndex][0];
                int nextColumn = column + directions[directionIndex][1];
                if (blocked.contains(key(nextRow, nextColumn))) {
                    break;
                }
                row = nextRow;
                column = nextColumn;
                bestDistance = Math.max(bestDistance, row * row + column * column);
            }
        }
        return bestDistance;
    }

    private String key(int row, int column) {
        return row + "," + column;
    }
}
