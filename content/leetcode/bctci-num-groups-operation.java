class UnionFind {
    private Map<Integer, Integer> parent = new HashMap<>();
    private Map<Integer, Integer> sizes = new HashMap<>();
    private Map<Integer, Integer> minimum = new HashMap<>();
    private int groups = 0;

    public void add(int x) {
        parent.put(x, x);
        sizes.put(x, 1);
        minimum.put(x, x);
        groups++;
    }

    private int root(int x) {
        while (x != parent.get(x)) {
            parent.put(x, parent.get(parent.get(x)));
            x = parent.get(x);
        }
        return x;
    }

    public int find(int x) {
        return minimum.get(root(x));
    }

    public void union(int x, int y) {
        x = root(x);
        y = root(y);
        if (x == y) {
            return;
        }
        if (sizes.get(x) < sizes.get(y)) {
            int temporary = x;
            x = y;
            y = temporary;
        }
        parent.put(y, x);
        sizes.put(x, sizes.get(x) + sizes.get(y));
        minimum.put(x, Math.min(minimum.get(x), minimum.get(y)));
        groups--;
    }

    public int size() {
        return parent.size();
    }

    public int numGroups() {
        return groups;
    }
}
