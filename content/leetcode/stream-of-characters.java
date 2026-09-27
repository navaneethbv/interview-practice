class StreamChecker {
    private static class Node { Node[] next = new Node[26]; boolean end; }
    private final Node root = new Node();
    private final StringBuilder stream = new StringBuilder();
    private int maxLength;
    public StreamChecker(String[] words) {
        for (String word : words) {
            maxLength = Math.max(maxLength, word.length());
            Node node = root;
            for (int i = word.length() - 1; i >= 0; i--) {
                int c = word.charAt(i) - 'a';
                if (node.next[c] == null) node.next[c] = new Node();
                node = node.next[c];
            }
            node.end = true;
        }
    }
    public boolean query(char letter) {
        stream.append(letter);
        Node node = root;
        for (int i = stream.length() - 1; i >= 0 && i >= stream.length() - maxLength; i--) {
            node = node.next[stream.charAt(i) - 'a'];
            if (node == null) return false;
            if (node.end) return true;
        }
        return false;
    }
}
