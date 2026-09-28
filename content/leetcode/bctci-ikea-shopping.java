class Solution {
    private double bestRating = -1;
    private List<Integer> bestPick = new ArrayList<>();

    public List<Integer> bestItems(int budget, int[] prices, double[] ratings) {
        choose(prices, ratings, 0, budget, 0, new ArrayList<>());
        return bestPick;
    }

    private void choose(int[] prices, double[] ratings, int index, int remaining, double rating, List<Integer> picked) {
        if (index == prices.length) {
            if (rating > bestRating) {
                bestRating = rating;
                bestPick = new ArrayList<>(picked);
            }
            return;
        }
        choose(prices, ratings, index + 1, remaining, rating, picked);
        if (prices[index] <= remaining) {
            picked.add(index);
            choose(prices, ratings, index + 1, remaining - prices[index], rating + ratings[index], picked);
            picked.remove(picked.size() - 1);
        }
    }
}
