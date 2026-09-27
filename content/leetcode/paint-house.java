class Solution {
    public int minCost(int[][] costs) {
        int[] bestCost = new int[3];
        for (int[] row : costs) {
            int[] nextCost = new int[3];
            for (int color = 0; color < 3; color++) {
                int otherCost = Math.min(bestCost[(color + 1) % 3], bestCost[(color + 2) % 3]);
                nextCost[color] = row[color] + otherCost;
            }
            bestCost = nextCost;
        }
        return Math.min(bestCost[0], Math.min(bestCost[1], bestCost[2]));
    }
}
