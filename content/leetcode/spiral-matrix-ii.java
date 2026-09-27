class Solution {
    public int[][] generateMatrix(int n) {
        int[][] matrix = new int[n][n];
        int top = 0;
        int left = 0;
        int bottom = n - 1;
        int right = n - 1;
        int value = 1;
        while (top <= bottom) {
            value = fillTop(matrix, top, left, right, value);
            top++;
            value = fillRight(matrix, right, top, bottom, value);
            right--;
            if (top <= bottom) {
                value = fillBottom(matrix, bottom, right, left, value);
                bottom--;
            }
            if (left <= right) {
                value = fillLeft(matrix, left, bottom, top, value);
                left++;
            }
        }
        return matrix;
    }

    private int fillTop(int[][] matrix, int row, int left, int right, int value) {
        for (int column = left; column <= right; column++) {
            matrix[row][column] = value++;
        }
        return value;
    }

    private int fillRight(int[][] matrix, int column, int top, int bottom, int value) {
        for (int row = top; row <= bottom; row++) {
            matrix[row][column] = value++;
        }
        return value;
    }

    private int fillBottom(int[][] matrix, int row, int right, int left, int value) {
        for (int column = right; column >= left; column--) {
            matrix[row][column] = value++;
        }
        return value;
    }

    private int fillLeft(int[][] matrix, int column, int bottom, int top, int value) {
        for (int row = bottom; row >= top; row--) {
            matrix[row][column] = value++;
        }
        return value;
    }
}
