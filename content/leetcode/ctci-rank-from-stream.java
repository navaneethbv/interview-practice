class StreamRank {
    private static final int MAX_VALUE = 100_000;
    private final int[] tree = new int[MAX_VALUE + 2];
    private final int[] counts = new int[MAX_VALUE + 1];

    public void track(int x) {
        counts[x]++;
        for (int position = x + 1; position < tree.length; position += position & -position) {
            tree[position]++;
        }
    }

    public int getRankOfNumber(int x) {
        if (counts[x] == 0) {
            return -1;
        }
        int total = 0;
        for (int position = x + 1; position > 0; position -= position & -position) {
            total += tree[position];
        }
        return total - 1;
    }
}
