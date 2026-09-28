class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        visit(1, n, k, new ArrayList<>(), result);
        return result;
    }

    private void visit(int start, int n, int k, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == k) {
            result.add(new ArrayList<>(path));
            return;
        }
        int last = n - (k - path.size()) + 1;
        for (int value = start; value <= last; value++) {
            path.add(value);
            visit(value + 1, n, k, path, result);
            path.remove(path.size() - 1);
        }
    }
}
