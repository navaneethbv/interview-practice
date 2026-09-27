class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int[] heights = new int[matrix[0].length];
        int answer = 0;
        for (int[] row : matrix) {
            updateHeights(row, heights);
            answer = Math.max(answer, bestArea(heights));
        }
        return answer;
    }

    private void updateHeights(int[] row, int[] heights) {
        for (int column = 0; column < row.length; column++) {
            heights[column] = row[column] == 1 ? heights[column] + 1 : 0;
        }
    }

    private int bestArea(int[] heights) {
        int[] sorted = heights.clone();
        Arrays.sort(sorted);
        int answer = 0;
        for (int index = 0; index < sorted.length; index++) {
            int width = sorted.length - index;
            answer = Math.max(answer, sorted[index] * width);
        }
        return answer;
    }
}
