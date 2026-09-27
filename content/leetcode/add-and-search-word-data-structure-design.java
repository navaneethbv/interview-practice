class WordDictionary {
    private static class TrieNode {
        final TrieNode[] children = new TrieNode[26];
        boolean word;
    }

    private final TrieNode root = new TrieNode();

    public WordDictionary() {}

    public void addWord(String word) {
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

    public boolean search(String word) {
        List<TrieNode> nodes = List.of(root);
        for (int index = 0; index < word.length(); index++) {
            nodes = advance(nodes, word.charAt(index));
        }
        for (TrieNode node : nodes) {
            if (node.word) {
                return true;
            }
        }
        return false;
    }

    private List<TrieNode> advance(List<TrieNode> nodes, char character) {
        List<TrieNode> following = new ArrayList<>();
        for (TrieNode node : nodes) {
            if (character == '.') {
                addChildren(node, following);
            } else {
                TrieNode child = node.children[character - 'a'];
                if (child != null) {
                    following.add(child);
                }
            }
        }
        return following;
    }

    private void addChildren(TrieNode node, List<TrieNode> following) {
        for (TrieNode child : node.children) {
            if (child != null) {
                following.add(child);
            }
        }
    }
}
