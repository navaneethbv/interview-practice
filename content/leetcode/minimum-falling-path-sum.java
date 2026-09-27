class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int[] previous = matrix[0].clone();
        for (int row = 1; row < matrix.length; row++) {
            int[] current = new int[matrix[row].length];
            for (int column = 0; column < matrix[row].length; column++) {
                int bestAbove = previous[column];
                if (column > 0) {
                    bestAbove = Math.min(bestAbove, previous[column - 1]);
                }
                if (column + 1 < previous.length) {
                    bestAbove = Math.min(bestAbove, previous[column + 1]);
                }
                current[column] = matrix[row][column] + bestAbove;
            }
            previous = current;
        }
        int answer = previous[0];
        for (int value : previous) {
            answer = Math.min(answer, value);
        }
        return answer;
    }
}
