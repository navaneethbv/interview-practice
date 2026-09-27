class Solution {
    public void rotate(int[][] matrix) {
        int size = matrix.length;
        for (int row = 0; row < size; row++) {
            for (int column = row + 1; column < size; column++) {
                int saved = matrix[row][column];
                matrix[row][column] = matrix[column][row];
                matrix[column][row] = saved;
            }
        }
        for (int[] row : matrix) {
            reverse(row);
        }
    }

    private void reverse(int[] row) {
        int left = 0;
        int right = row.length - 1;
        while (left < right) {
            int saved = row[left];
            row[left] = row[right];
            row[right] = saved;
            left++;
            right--;
        }
    }
}
