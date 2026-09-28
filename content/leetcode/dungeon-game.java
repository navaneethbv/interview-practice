class Solution {
    public int calculateMinimumHP(int[][] dungeon) {
        int rows = dungeon.length;
        int columns = dungeon[0].length;
        int[] minimumHealth = new int[columns + 1];
        Arrays.fill(minimumHealth, Integer.MAX_VALUE / 4);
        minimumHealth[columns - 1] = 1;
        for (int row = rows - 1; row >= 0; row--) {
            for (int column = columns - 1; column >= 0; column--) {
                int neededAfterCell = Math.min(minimumHealth[column], minimumHealth[column + 1]);
                minimumHealth[column] = Math.max(1, neededAfterCell - dungeon[row][column]);
            }
        }
        return minimumHealth[0];
    }
}
