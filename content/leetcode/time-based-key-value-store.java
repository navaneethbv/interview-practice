class TimeMap {
    private record Entry(int timestamp, String value) {}

    private final Map<String, List<Entry>> history = new HashMap<>();

    public TimeMap() {}

    public void set(String key, String value, int timestamp) {
        history.computeIfAbsent(key, ignored -> new ArrayList<>()).add(new Entry(timestamp, value));
    }

    public String get(String key, int timestamp) {
        List<Entry> entries = history.getOrDefault(key, Collections.emptyList());
        int left = 0;
        int right = entries.size();
        while (left < right) {
            int middle = left + (right - left) / 2;
            if (entries.get(middle).timestamp() <= timestamp) {
                left = middle + 1;
            } else {
                right = middle;
            }
        }
        return left == 0 ? "" : entries.get(left - 1).value();
    }
}
