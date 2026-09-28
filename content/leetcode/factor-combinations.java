class Solution {
    public List<List<Integer>> getFactors(int n) {
        List<List<Integer>> result = new ArrayList<>();
        collectFactors(n, 2, new ArrayList<>(), result);
        return result;
    }

    private void collectFactors(int remaining, int smallestFactor, List<Integer> path,
                                List<List<Integer>> result) {
        for (int factor = smallestFactor; factor * factor <= remaining; factor++) {
            if (remaining % factor != 0) {
                continue;
            }
            List<Integer> combination = new ArrayList<>(path);
            combination.add(factor);
            combination.add(remaining / factor);
            result.add(combination);
            path.add(factor);
            collectFactors(remaining / factor, factor, path, result);
            path.remove(path.size() - 1);
        }
    }
}
