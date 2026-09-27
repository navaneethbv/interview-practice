class Solution {
    public Node insert(Node head, int insertVal) {
        if (head == null) {
            head = new Node(insertVal);
            head.next = head;
            return head;
        }

        Node node = head;
        do {
            if (fitsBetween(node.val, node.next.val, insertVal)) {
                break;
            }
            node = node.next;
        } while (node != head);
        node.next = new Node(insertVal, node.next);
        return head;
    }

    private boolean fitsBetween(int current, int following, int value) {
        if (current <= value && value <= following) {
            return true;
        }
        return current > following && (value >= current || value <= following);
    }
}
