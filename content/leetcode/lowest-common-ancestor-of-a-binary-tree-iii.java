class Solution {
    public Node lowestCommonAncestor(Node p, Node q) {
        Node first = p;
        Node second = q;
        while (first != second) {
            first = first == null ? q : first.parent;
            second = second == null ? p : second.parent;
        }
        return first;
    }
}
