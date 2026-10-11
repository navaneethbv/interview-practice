class Solution {
    private final Map<Integer, List<TreeNode>> memo = new HashMap<>();

    public List<TreeNode> allPossibleFBT(int n) {
        if (n % 2 == 0) {
            return new ArrayList<>();
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        List<TreeNode> trees = new ArrayList<>();
        if (n == 1) {
            trees.add(new TreeNode(0));
        } else {
            for (int left = 1; left < n - 1; left += 2) {
                for (TreeNode l : allPossibleFBT(left)) {
                    for (TreeNode r : allPossibleFBT(n - 1 - left)) {
                        trees.add(new TreeNode(0, l, r));
                    }
                }
            }
        }
        memo.put(n, trees);
        return trees;
    }
}
