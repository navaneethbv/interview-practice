class StockPrice {
    private final Map<Integer, Integer> prices = new HashMap<>();
    // Multiset of current prices: price to number of timestamps with that price.
    private final TreeMap<Integer, Integer> counts = new TreeMap<>();
    private int latest = 0;

    public StockPrice() {
    }

    public void update(int timestamp, int price) {
        Integer old = prices.put(timestamp, price);
        if (old != null && counts.merge(old, -1, Integer::sum) == 0) {
            counts.remove(old);
        }
        counts.merge(price, 1, Integer::sum);
        latest = Math.max(latest, timestamp);
    }

    public int current() {
        return prices.get(latest);
    }

    public int maximum() {
        return counts.lastKey();
    }

    public int minimum() {
        return counts.firstKey();
    }
}
