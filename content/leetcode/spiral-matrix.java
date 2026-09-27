class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        int top = 0;
        int bottom = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;
        List<Integer> result = new ArrayList<>();
        while (top <= bottom && left <= right) {
            appendRow(matrix, top, left, right, 1, result);
            top++;
            appendColumn(matrix, right, top, bottom, 1, result);
            right--;
            if (top <= bottom) {
                appendRow(matrix, bottom, right, left, -1, result);
                bottom--;
            }
            if (left <= right) {
                appendColumn(matrix, left, bottom, top, -1, result);
                left++;
            }
        }
        return result;
    }

    private void appendRow(int[][] matrix, int row, int start, int end, int step, List<Integer> result) {
        for (int column = start; step * column <= step * end; column += step) {
            result.add(matrix[row][column]);
        }
    }

    private void appendColumn(int[][] matrix, int column, int start, int end, int step, List<Integer> result) {
        for (int row = start; step * row <= step * end; row += step) {
            result.add(matrix[row][column]);
        }
    }
}
