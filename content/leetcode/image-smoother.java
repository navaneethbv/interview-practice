class Solution {
    public int[][] imageSmoother(int[][] img) {
        int rows = img.length;
        int columns = img[0].length;
        int[][] smoothed = new int[rows][columns];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                smoothed[row][column] = averageAround(img, row, column);
            }
        }
        return smoothed;
    }

    private int averageAround(int[][] img, int row, int column) {
        int total = 0;
        int count = 0;
        int firstRow = Math.max(0, row - 1);
        int lastRow = Math.min(img.length - 1, row + 1);
        int firstColumn = Math.max(0, column - 1);
        int lastColumn = Math.min(img[0].length - 1, column + 1);
        for (int neighborRow = firstRow; neighborRow <= lastRow; neighborRow++) {
            for (int neighborColumn = firstColumn; neighborColumn <= lastColumn; neighborColumn++) {
                total += img[neighborRow][neighborColumn];
                count++;
            }
        }
        return total / count;
    }
}
