class Solution {
    public int[][] spiralMatrixIII(int rows, int cols, int rStart, int cStart) {
        List<int[]> coordinates = new ArrayList<>();
        int[] position = {rStart, cStart};
        coordinates.add(new int[]{rStart, cStart});
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int directionIndex = 0;
        int stepLength = 1;
        while (coordinates.size() < rows * cols) {
            walkLeg(position, directions[directionIndex % 4], stepLength, rows, cols, coordinates);
            directionIndex++;
            walkLeg(position, directions[directionIndex % 4], stepLength, rows, cols, coordinates);
            directionIndex++;
            stepLength++;
        }
        int[][] result = new int[coordinates.size()][2];
        for (int index = 0; index < coordinates.size(); index++) {
            result[index] = coordinates.get(index);
        }
        return result;
    }

    private void walkLeg(int[] position, int[] direction, int steps, int rows, int cols,
                         List<int[]> coordinates) {
        for (int step = 0; step < steps; step++) {
            position[0] += direction[0];
            position[1] += direction[1];
            if (position[0] >= 0 && position[0] < rows
                    && position[1] >= 0 && position[1] < cols) {
                coordinates.add(new int[]{position[0], position[1]});
            }
        }
    }
}
