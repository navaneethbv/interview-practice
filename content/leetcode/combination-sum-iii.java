class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> combinations = new ArrayList<>();
        visit(1, k, n, new ArrayList<>(), combinations);
        return combinations;
    }

    private void visit(int start, int slots, int remaining, List<Integer> path,
            List<List<Integer>> combinations) {
        if (slots == 0) {
            if (remaining == 0) {
                combinations.add(new ArrayList<>(path));
            }
            return;
        }
        for (int value = start; value <= 9 && value <= remaining; value++) {
            path.add(value);
            visit(value + 1, slots - 1, remaining - value, path, combinations);
            path.remove(path.size() - 1);
        }
    }
}
