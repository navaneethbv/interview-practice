class Solution {
    public Node treeToDoublyList(Node root) {
        if (root == null) {
            return null;
        }

        Deque<Node> stack = new ArrayDeque<>();
        Node current = root;
        Node first = null;
        Node previous = null;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            Node nextTreeNode = current.right;
            if (previous == null) {
                first = current;
            } else {
                previous.right = current;
                current.left = previous;
            }
            previous = current;
            current = nextTreeNode;
        }

        previous.right = first;
        first.left = previous;
        return first;
    }
}
