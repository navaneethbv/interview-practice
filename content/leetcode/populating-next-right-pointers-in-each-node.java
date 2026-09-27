class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return null;
        }
        root.next = null;
        Node levelStart = root;
        while (levelStart != null) {
            levelStart = connectLevel(levelStart);
        }
        return root;
    }

    private Node connectLevel(Node levelStart) {
        Node dummy = new Node(0);
        Node tail = dummy;
        Node current = levelStart;
        while (current != null) {
            if (current.left != null) {
                tail.next = current.left;
                tail = tail.next;
            }
            if (current.right != null) {
                tail.next = current.right;
                tail = tail.next;
            }
            current = current.next;
        }
        tail.next = null;
        return dummy.next;
    }
}
