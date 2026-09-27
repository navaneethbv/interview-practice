class Codec {
    private static class Frame {
        Node node;
        int remaining;

        Frame(Node node, int remaining) {
            this.node = node;
            this.remaining = remaining;
        }
    }

    public String serialize(Node root) {
        if (root == null) {
            return "# ";
        }
        StringBuilder output = new StringBuilder();
        Deque<Node> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            Node node = stack.pop();
            output.append(node.val).append(' ').append(node.children.size()).append(' ');
            for (int index = node.children.size() - 1; index >= 0; index--) {
                stack.push(node.children.get(index));
            }
        }
        return output.toString();
    }

    public Node deserialize(String data) {
        String trimmed = data.trim();
        if (trimmed.equals("#") || trimmed.isEmpty()) {
            return null;
        }
        String[] tokens = trimmed.split("\\s+");
        Node root = new Node(Integer.parseInt(tokens[0]));
        Deque<Frame> frames = new ArrayDeque<>();
        int rootChildren = Integer.parseInt(tokens[1]);
        if (rootChildren > 0) {
            frames.push(new Frame(root, rootChildren));
        }
        int tokenIndex = 2;
        while (tokenIndex < tokens.length) {
            while (!frames.isEmpty() && frames.peek().remaining == 0) {
                frames.pop();
            }
            Frame parent = frames.peek();
            Node child = new Node(Integer.parseInt(tokens[tokenIndex]));
            int childCount = Integer.parseInt(tokens[tokenIndex + 1]);
            tokenIndex += 2;
            parent.node.children.add(child);
            parent.remaining--;
            if (childCount > 0) {
                frames.push(new Frame(child, childCount));
            }
        }
        return root;
    }
}
