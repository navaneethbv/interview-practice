class Solution {
    public Node copyRandomList(Node head) {
        Map<Node, Node> copies = new IdentityHashMap<>();
        for (Node current = head; current != null; current = current.next) {
            copies.put(current, new Node(current.val));
        }
        for (Node current = head; current != null; current = current.next) {
            copies.get(current).next = copies.get(current.next);
            copies.get(current).random = copies.get(current.random);
        }
        return copies.get(head);
    }
}
