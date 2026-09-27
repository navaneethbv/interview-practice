class Solution {
    public int[][] minAbsDiff(int[][] grid, int k) {
        int rows = grid.length - k + 1;
        int columns = grid[0].length - k + 1;
        int[][] answer = new int[rows][columns];
        for (int top = 0; top < rows; top++) {
            for (int left = 0; left < columns; left++) {
                answer[top][left] = closestGap(grid, top, left, k);
            }
        }
        return answer;
    }

    private int closestGap(int[][] grid, int top, int left, int size) {
        TreeSet<Integer> values = new TreeSet<>();
        for (int row = top; row < top + size; row++) {
            for (int column = left; column < left + size; column++) {
                values.add(grid[row][column]);
            }
        }
        int answer = Integer.MAX_VALUE;
        Integer previous = null;
        for (int value : values) {
            if (previous != null) {
                answer = Math.min(answer, value - previous);
            }
            previous = value;
        }
        return answer == Integer.MAX_VALUE ? 0 : answer;
    }
}
