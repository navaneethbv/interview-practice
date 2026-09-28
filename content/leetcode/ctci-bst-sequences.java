class Solution {
    public List<List<Integer>> allSequences(TreeNode root) {
        List<List<Integer>> results = new ArrayList<>();
        if (root == null) {
            results.add(new ArrayList<>());
            return results;
        }
        List<List<Integer>> lefts = allSequences(root.left);
        List<List<Integer>> rights = allSequences(root.right);
        for (List<Integer> left : lefts) {
            for (List<Integer> right : rights) {
                List<Integer> prefix = new ArrayList<>();
                prefix.add(root.val);
                weave(left, 0, right, 0, prefix, results);
            }
        }
        return results;
    }

    private void weave(List<Integer> first, int i, List<Integer> second, int j,
                       List<Integer> prefix, List<List<Integer>> results) {
        if (i == first.size() || j == second.size()) {
            List<Integer> sequence = new ArrayList<>(prefix);
            sequence.addAll(first.subList(i, first.size()));
            sequence.addAll(second.subList(j, second.size()));
            results.add(sequence);
            return;
        }
        prefix.add(first.get(i));
        weave(first, i + 1, second, j, prefix, results);
        prefix.set(prefix.size() - 1, second.get(j));
        weave(first, i, second, j + 1, prefix, results);
        prefix.remove(prefix.size() - 1);
    }
}
