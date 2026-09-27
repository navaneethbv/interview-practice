class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        int size = matrix.length;
        long left = matrix[0][0];
        long right = matrix[size - 1][size - 1];

        while (left < right) {
            long middle = left + (right - left) / 2;
            int count = countAtMost(matrix, middle);

            if (count < k) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }

        return (int) left;
    }

    private int countAtMost(int[][] matrix, long value) {
        int column = matrix.length - 1;
        int count = 0;

        for (int[] row : matrix) {
            while (column >= 0 && row[column] > value) {
                column--;
            }
            count += column + 1;
        }

        return count;
    }
}
