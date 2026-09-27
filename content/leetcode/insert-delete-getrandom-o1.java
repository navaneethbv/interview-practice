class RandomizedSet {
    private List<Integer> values = new ArrayList<>();
    private Map<Integer, Integer> index = new HashMap<>();
    private Random random = new Random(0);

    public RandomizedSet() {
    }

    public boolean insert(int val) {
        if (index.containsKey(val)) {
            return false;
        }
        index.put(val, values.size());
        values.add(val);
        return true;
    }

    public boolean remove(int val) {
        Integer removedIndex = index.remove(val);
        if (removedIndex == null) {
            return false;
        }
        int lastValue = values.remove(values.size() - 1);
        if (removedIndex < values.size()) {
            values.set(removedIndex, lastValue);
            index.put(lastValue, removedIndex);
        }
        return true;
    }

    public int getRandom() {
        return values.get(random.nextInt(values.size()));
    }
}
