class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) {
            return null;
        }
        Map<Node, Node> copies = new IdentityHashMap<>();
        Deque<Node> queue = new ArrayDeque<>();
        copies.put(node, new Node(node.val));
        queue.addLast(node);
        while (!queue.isEmpty()) {
            Node original = queue.removeFirst();
            for (Node neighbor : original.neighbors) {
                if (!copies.containsKey(neighbor)) {
                    copies.put(neighbor, new Node(neighbor.val));
                    queue.addLast(neighbor);
                }
                copies.get(original).neighbors.add(copies.get(neighbor));
            }
        }
        return copies.get(node);
    }
}
