class Solution {
    public TreeNode sortedListToBST(ListNode head) {
        List<Integer> values = new ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) values.add(node.val);
        return build(values, 0, values.size());
    }
    private TreeNode build(List<Integer> values, int start, int end) {
        if (start >= end) return null;
        int mid = (start + end) / 2;
        TreeNode node = new TreeNode(values.get(mid));
        node.left = build(values, start, mid); node.right = build(values, mid + 1, end);
        return node;
    }
}
