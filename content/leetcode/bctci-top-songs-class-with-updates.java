class TopSongs {
    private record Entry(long plays, String title) {}

    private final int k;
    private final Map<String, Long> totals = new HashMap<>();
    private final PriorityQueue<Entry> heap = new PriorityQueue<>(
            Comparator.comparingLong((Entry entry) -> -entry.plays()).thenComparing(Entry::title));

    public TopSongs(int k) {
        this.k = k;
    }

    public void registerPlays(String title, int plays) {
        long total = totals.merge(title, (long) plays, Long::sum);
        heap.add(new Entry(total, title));
    }

    public List<String> topK() {
        List<String> result = new ArrayList<>();
        List<Entry> kept = new ArrayList<>();
        while (!heap.isEmpty() && result.size() < k) {
            Entry entry = heap.poll();
            if (entry.plays() == totals.get(entry.title()) && !result.contains(entry.title())) {
                result.add(entry.title());
                kept.add(entry);
            }
        }
        heap.addAll(kept);
        return result;
    }
}
