class Solution {
    public int closestToRiver(int[][] field) {
        int row = 0;
        while (field[row][0] != 1) {
            row++;
        }
        int closest = row;
        for (int col = 1; col < field[0].length; col++) {
            for (int candidate = row - 1; candidate <= row + 1; candidate++) {
                if (candidate >= 0 && candidate < field.length && field[candidate][col] == 1) {
                    row = candidate;
                    break;
                }
            }
            closest = Math.min(closest, row);
        }
        return closest;
    }
}
