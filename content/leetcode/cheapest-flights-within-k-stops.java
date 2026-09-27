class Solution {
    public int findCheapestPrice(
            int n,
            int[][] flights,
            int src,
            int dst,
            int k) {
        int[] costs = new int[n];
        Arrays.fill(costs, Integer.MAX_VALUE);
        costs[src] = 0;

        for (int flightCount = 0; flightCount <= k; flightCount++) {
            int[] updatedCosts = costs.clone();
            for (int[] flight : flights) {
                if (costs[flight[0]] == Integer.MAX_VALUE) {
                    continue;
                }
                int newCost = costs[flight[0]] + flight[2];
                updatedCosts[flight[1]] = Math.min(updatedCosts[flight[1]], newCost);
            }
            costs = updatedCosts;
        }

        return costs[dst] == Integer.MAX_VALUE ? -1 : costs[dst];
    }
}
