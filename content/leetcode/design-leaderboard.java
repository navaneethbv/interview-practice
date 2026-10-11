class Leaderboard {
    private final Map<Integer, Integer> scores = new HashMap<>();
    // Every player's total, as a multiset ordered from highest to lowest.
    private final TreeMap<Integer, Integer> totals = new TreeMap<>(Collections.reverseOrder());

    public Leaderboard() {
    }

    public void addScore(int playerId, int score) {
        int old = scores.getOrDefault(playerId, 0);
        if (old > 0) {
            remove(old);
        }
        scores.put(playerId, old + score);
        totals.merge(old + score, 1, Integer::sum);
    }

    public int top(int K) {
        int sum = 0;
        for (Map.Entry<Integer, Integer> entry : totals.entrySet()) {
            int take = Math.min(K, entry.getValue());
            sum += take * entry.getKey();
            K -= take;
            if (K == 0) {
                break;
            }
        }
        return sum;
    }

    public void reset(int playerId) {
        remove(scores.remove(playerId));
    }

    private void remove(int total) {
        if (totals.merge(total, -1, Integer::sum) == 0) {
            totals.remove(total);
        }
    }
}
