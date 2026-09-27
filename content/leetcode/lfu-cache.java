class LFUCache {
    private final int capacity;
    private final Map<Integer, Integer> values = new HashMap<>();
    private final Map<Integer, Integer> frequencies = new HashMap<>();
    private final Map<Integer, LinkedHashSet<Integer>> groups = new HashMap<>();
    private int minimumFrequency = 0;

    public LFUCache(int capacity) {
        this.capacity = capacity;
    }

    public int get(int key) {
        if (!values.containsKey(key)) {
            return -1;
        }
        touch(key);
        return values.get(key);
    }

    public void put(int key, int value) {
        if (capacity == 0) {
            return;
        }
        if (values.containsKey(key)) {
            values.put(key, value);
            touch(key);
            return;
        }
        if (values.size() == capacity) {
            LinkedHashSet<Integer> leastUsed = groups.get(minimumFrequency);
            int evicted = leastUsed.iterator().next();
            leastUsed.remove(evicted);
            if (leastUsed.isEmpty()) {
                groups.remove(minimumFrequency);
            }
            values.remove(evicted);
            frequencies.remove(evicted);
        }
        values.put(key, value);
        frequencies.put(key, 1);
        groups.computeIfAbsent(1, ignored -> new LinkedHashSet<>()).add(key);
        minimumFrequency = 1;
    }

    private void touch(int key) {
        int oldFrequency = frequencies.get(key);
        LinkedHashSet<Integer> oldGroup = groups.get(oldFrequency);
        oldGroup.remove(key);
        if (oldGroup.isEmpty()) {
            groups.remove(oldFrequency);
            if (oldFrequency == minimumFrequency) {
                minimumFrequency++;
            }
        }
        int newFrequency = oldFrequency + 1;
        frequencies.put(key, newFrequency);
        groups.computeIfAbsent(newFrequency, ignored -> new LinkedHashSet<>()).add(key);
    }
}
