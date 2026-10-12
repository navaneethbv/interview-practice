class TTLStore {
    private final Map<String, long[]> entries = new HashMap<>();

    public TTLStore() {}

    public void put(String key, int value, int ttl, int timestamp) {
        entries.put(key, new long[] {value, (long) timestamp + ttl});
    }

    public int[] get(String key, int timestamp) {
        long[] entry = entries.get(key);
        if (entry == null) {
            return new int[0];
        }
        if (timestamp >= entry[1]) {
            entries.remove(key);
            return new int[0];
        }
        return new int[] {(int) entry[0]};
    }

    public boolean remove(String key, int timestamp) {
        if (get(key, timestamp).length == 0) {
            return false;
        }
        entries.remove(key);
        return true;
    }
}
