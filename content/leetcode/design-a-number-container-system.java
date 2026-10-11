class NumberContainers {
    private final Map<Integer, Integer> at = new HashMap<>();
    private final Map<Integer, TreeSet<Integer>> indexes = new HashMap<>();

    public NumberContainers() {
    }

    public void change(int index, int number) {
        Integer old = at.put(index, number);
        if (old != null) {
            indexes.get(old).remove(index);
        }
        indexes.computeIfAbsent(number, key -> new TreeSet<>()).add(index);
    }

    public int find(int number) {
        TreeSet<Integer> set = indexes.get(number);
        return set == null || set.isEmpty() ? -1 : set.first();
    }
}
