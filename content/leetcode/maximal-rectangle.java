class Solution {
    public int maximalRectangle(char[][] matrix) {
        int[] heights = new int[matrix[0].length];
        int bestArea = 0;
        for (char[] row : matrix) {
            for (int column = 0; column < row.length; column++) {
                heights[column] = row[column] == '1' ? heights[column] + 1 : 0;
            }
            bestArea = Math.max(bestArea, largestHistogram(heights));
        }
        return bestArea;
    }

    private int largestHistogram(int[] heights) {
        Deque<int[]> stack = new ArrayDeque<>();
        int bestArea = 0;
        for (int index = 0; index <= heights.length; index++) {
            int currentHeight = index == heights.length ? 0 : heights[index];
            int start = index;
            while (!stack.isEmpty() && stack.peek()[1] > currentHeight) {
                int[] entry = stack.pop();
                start = entry[0];
                bestArea = Math.max(bestArea, entry[1] * (index - start));
            }
            if (stack.isEmpty() || stack.peek()[1] < currentHeight) {
                stack.push(new int[]{start, currentHeight});
            }
        }
        return bestArea;
    }
}
