class Solution {
    public double knightProbability(int n, int k, int row, int column) {
        double[][] probabilities = new double[n][n];
        probabilities[row][column] = 1.0;
        int[][] moves = {{1, 2}, {1, -2}, {-1, 2}, {-1, -2},
                {2, 1}, {2, -1}, {-2, 1}, {-2, -1}};
        for (int step = 0; step < k; step++) {
            probabilities = nextProbabilities(probabilities, moves);
        }
        return sum(probabilities);
    }

    private double[][] nextProbabilities(double[][] current, int[][] moves) {
        int size = current.length;
        double[][] next = new double[size][size];
        for (int row = 0; row < size; row++) {
            for (int column = 0; column < size; column++) {
                if (current[row][column] == 0.0) continue;
                for (int[] move : moves) {
                    int nextRow = row + move[0];
                    int nextColumn = column + move[1];
                    if (nextRow >= 0 && nextRow < size && nextColumn >= 0 && nextColumn < size) {
                        next[nextRow][nextColumn] += current[row][column] / 8.0;
                    }
                }
            }
        }
        return next;
    }

    private double sum(double[][] probabilities) {
        double total = 0.0;
        for (double[] row : probabilities) {
            for (double probability : row) total += probability;
        }
        return total;
    }
}
