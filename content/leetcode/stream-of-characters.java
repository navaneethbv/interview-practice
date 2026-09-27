class StreamChecker {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean terminal;
    }

    private final TrieNode root = new TrieNode();
    private final Deque<Character> stream = new ArrayDeque<>();
    private int maximumLength = 0;

    public StreamChecker(String[] words) {
        for (String word : words) {
            maximumLength = Math.max(maximumLength, word.length());
            insert(word);
        }
    }

    private void insert(String word) {
        TrieNode node = root;
        for (int index = word.length() - 1; index >= 0; index--) {
            int letterIndex = word.charAt(index) - 'a';
            if (node.children[letterIndex] == null) {
                node.children[letterIndex] = new TrieNode();
            }
            node = node.children[letterIndex];
        }
        node.terminal = true;
    }

    public boolean query(char letter) {
        stream.addLast(letter);
        if (stream.size() > maximumLength) {
            stream.removeFirst();
        }
        TrieNode node = root;
        Iterator<Character> characters = stream.descendingIterator();
        while (characters.hasNext()) {
            node = node.children[characters.next() - 'a'];
            if (node == null) {
                return false;
            }
            if (node.terminal) {
                return true;
            }
        }
        return false;
    }
}
