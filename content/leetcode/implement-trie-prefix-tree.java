class Trie {
    private static class Node {
        Node[] children = new Node[26];
        boolean word;
    }
    private final Node root = new Node();
    public Trie() {}
    public void insert(String word) {
        Node node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new Node();
            node = node.children[c - 'a'];
        }
        node.word = true;
    }
    private Node walk(String word) {
        Node node = root;
        for (char c : word.toCharArray()) {
            node = node.children[c - 'a'];
            if (node == null) return null;
        }
        return node;
    }
    public boolean search(String word) {
        Node node = walk(word);
        return node != null && node.word;
    }
    public boolean startsWith(String prefix) { return walk(prefix) != null; }
}
