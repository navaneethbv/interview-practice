class Trie {
    private static class TrieNode {
        final TrieNode[] children = new TrieNode[26];
        boolean word;
    }

    private final TrieNode root = new TrieNode();

    public Trie() {}

    public void insert(String word) {
        TrieNode node = root;
        for (int index = 0; index < word.length(); index++) {
            int letter = word.charAt(index) - 'a';
            if (node.children[letter] == null) {
                node.children[letter] = new TrieNode();
            }
            node = node.children[letter];
        }
        node.word = true;
    }

    private TrieNode walk(String word) {
        TrieNode node = root;
        for (int index = 0; index < word.length(); index++) {
            node = node.children[word.charAt(index) - 'a'];
            if (node == null) {
                return null;
            }
        }
        return node;
    }

    public boolean search(String word) {
        TrieNode node = walk(word);
        return node != null && node.word;
    }

    public boolean startsWith(String prefix) {
        return walk(prefix) != null;
    }
}
