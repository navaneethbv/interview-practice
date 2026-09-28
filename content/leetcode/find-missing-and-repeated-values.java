class Solution {
    public int[] findMissingAndRepeatedValues(int[][] grid) {
        int size = grid.length;
        int[] counts = new int[size * size + 1];
        for (int[] row : grid) {
            for (int value : row) {
                counts[value]++;
            }
        }
        int[] answer = new int[2];
        for (int value = 1; value < counts.length; value++) {
            if (counts[value] == 2) {
                answer[0] = value;
            } else if (counts[value] == 0) {
                answer[1] = value;
            }
        }
        return answer;
    }
}
