class MyHashMap {
    private static final int BUCKET_COUNT = 1009;
    private final List<List<int[]>> buckets = new ArrayList<>();

    public MyHashMap() {
        for (int index = 0; index < BUCKET_COUNT; index++) {
            buckets.add(new ArrayList<>());
        }
    }

    public void put(int key, int value) {
        List<int[]> bucket = buckets.get(key % BUCKET_COUNT);
        for (int[] pair : bucket) {
            if (pair[0] == key) {
                pair[1] = value;
                return;
            }
        }
        bucket.add(new int[]{key, value});
    }

    public int get(int key) {
        for (int[] pair : buckets.get(key % BUCKET_COUNT)) {
            if (pair[0] == key) {
                return pair[1];
            }
        }
        return -1;
    }

    public void remove(int key) {
        List<int[]> bucket = buckets.get(key % BUCKET_COUNT);
        for (int index = 0; index < bucket.size(); index++) {
            if (bucket.get(index)[0] == key) {
                bucket.remove(index);
                return;
            }
        }
    }
}
