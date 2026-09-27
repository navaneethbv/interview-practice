class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        Map<Node, Node> copies = new IdentityHashMap<>();
        ArrayDeque<Node> queue = new ArrayDeque<>();
        copies.put(node, new Node(node.val)); queue.add(node);
        while (!queue.isEmpty()) {
            Node old = queue.remove();
            for (Node next : old.neighbors) {
                if (!copies.containsKey(next)) { copies.put(next, new Node(next.val)); queue.add(next); }
                copies.get(old).neighbors.add(copies.get(next));
            }
        }
        return copies.get(node);
    }
}
