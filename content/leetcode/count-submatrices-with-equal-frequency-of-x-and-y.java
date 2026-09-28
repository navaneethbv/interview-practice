class Solution {
    public int numberOfSubmatrices(char[][] grid) {
        int columns = grid[0].length;
        int[] xTotals = new int[columns];
        int[] yTotals = new int[columns];
        int answer = 0;
        for (char[] row : grid) {
            answer += processRow(row, xTotals, yTotals);
        }
        return answer;
    }

    private int processRow(char[] row, int[] xTotals, int[] yTotals) {
        int xCount = 0;
        int yCount = 0;
        int answer = 0;
        for (int column = 0; column < row.length; column++) {
            if (row[column] == 'X') {
                xCount++;
            }
            if (row[column] == 'Y') {
                yCount++;
            }
            xTotals[column] += xCount;
            yTotals[column] += yCount;
            if (xTotals[column] > 0 && xTotals[column] == yTotals[column]) {
                answer++;
            }
        }
        return answer;
    }
}
