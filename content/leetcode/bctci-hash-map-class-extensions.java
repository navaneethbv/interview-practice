class Buckets {
    private List<List<Entry>> buckets = allocate(8);
    int count = 0;

    private static class Entry {
        int key;
        List<Integer> values;
        Entry(int key, List<Integer> values) {
            this.key = key;
            this.values = values;
        }
    }

    private List<List<Entry>> allocate(int size) {
        List<List<Entry>> result = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            result.add(new ArrayList<>());
        }
        return result;
    }

    List<Integer> get(int key) {
        for (Entry entry : buckets.get(Math.floorMod(key, buckets.size()))) {
            if (entry.key == key) {
                return entry.values;
            }
        }
        return new ArrayList<>();
    }

    void put(int key, List<Integer> values) {
        remove(key);
        buckets.get(Math.floorMod(key, buckets.size())).add(new Entry(key, values));
        count++;
        if (count > 2 * buckets.size()) {
            List<List<Entry>> old = buckets;
            buckets = allocate(2 * old.size());
            for (List<Entry> bucket : old) {
                for (Entry entry : bucket) {
                    buckets.get(Math.floorMod(entry.key, buckets.size())).add(entry);
                }
            }
        }
    }

    void remove(int key) {
        List<Entry> bucket = buckets.get(Math.floorMod(key, buckets.size()));
        for (int i = 0; i < bucket.size(); i++) {
            if (bucket.get(i).key == key) {
                bucket.remove(i);
                count--;
                return;
            }
        }
    }

    List<Integer> keys() {
        List<Integer> result = new ArrayList<>();
        for (List<Entry> bucket : buckets) {
            for (Entry entry : bucket) {
                result.add(entry.key);
            }
        }
        Collections.sort(result);
        return result;
    }
}

class ExtendedHashMap {
    private Buckets table = new Buckets();
    private int total = 0;

    public void add(int key, int value) {
        table.put(key, new ArrayList<>(List.of(value)));
    }

    public void remove(int key) {
        table.remove(key);
    }

    public boolean contains(int key) {
        return !table.get(key).isEmpty();
    }

    public int size() {
        return table.count;
    }

    public List<Integer> get(int key) {
        return new ArrayList<>(table.get(key));
    }

    public List<Integer> keys() {
        return table.keys();
    }

    public List<Integer> values() {
        List<Integer> result = new ArrayList<>();
        for (int key : keys()) {
            result.add(table.get(key).get(0));
        }
        Collections.sort(result);
        return result;
    }
}
