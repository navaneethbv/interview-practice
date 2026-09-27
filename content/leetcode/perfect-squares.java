class Solution {
    public int numSquares(int n) {
        int[] minimumCounts = new int[n + 1];
        Arrays.fill(minimumCounts, n);
        minimumCounts[0] = 0;

        for (int value = 1; value <= n; value++) {
            for (int squareRoot = 1;
                    squareRoot * squareRoot <= value;
                    squareRoot++) {
                minimumCounts[value] = Math.min(
                        minimumCounts[value],
                        1 + minimumCounts[value - squareRoot * squareRoot]);
            }
        }
        return minimumCounts[n];
    }
}
