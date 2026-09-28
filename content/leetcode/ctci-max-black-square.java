class Solution {
    public int findSquare(int[][] matrix) {
        int n = matrix.length;
        int[][] right = new int[n + 1][n + 1];
        int[][] down = new int[n + 1][n + 1];
        for (int row = n - 1; row >= 0; row--) {
            for (int col = n - 1; col >= 0; col--) {
                if (matrix[row][col] == 1) {
                    right[row][col] = right[row][col + 1] + 1;
                    down[row][col] = down[row + 1][col] + 1;
                }
            }
        }
        for (int size = n; size > 0; size--) {
            for (int row = 0; row + size <= n; row++) {
                for (int col = 0; col + size <= n; col++) {
                    boolean topLeft = Math.min(right[row][col], down[row][col]) >= size;
                    boolean rightEdge = down[row][col + size - 1] >= size;
                    boolean bottomEdge = right[row + size - 1][col] >= size;
                    if (topLeft && rightEdge && bottomEdge) {
                        return size;
                    }
                }
            }
        }
        return 0;
    }
}
