class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int row = 0;
        int column = matrix[0].length - 1;

        while (row < matrix.length && column >= 0) {
            int value = matrix[row][column];
            if (value == target) {
                return true;
            }
            if (value > target) {
                column--;
            } else {
                row++;
            }
        }
        return false;
    }
}
