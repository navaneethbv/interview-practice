class WordDictionary {
    private static class Node {
        Node[] children = new Node[26];
        boolean word;
    }
    private final Node root = new Node();
    public WordDictionary() {}
    public void addWord(String word) {
        Node node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new Node();
            node = node.children[c - 'a'];
        }
        node.word = true;
    }
    private boolean match(Node node, String word, int i) {
        if (node == null) return false;
        if (i == word.length()) return node.word;
        char c = word.charAt(i);
        if (c != '.') return match(node.children[c - 'a'], word, i + 1);
        for (Node child : node.children) if (match(child, word, i + 1)) return true;
        return false;
    }
    public boolean search(String word) { return match(root, word, 0); }
}
