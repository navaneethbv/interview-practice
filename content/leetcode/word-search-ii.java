class Solution {
    private static class TrieNode {
        final Map<Character, TrieNode> children = new HashMap<>();
        String word;
    }

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode trie = new TrieNode();
        for (String word : words) {
            insert(trie, word);
        }
        List<String> result = new ArrayList<>();
        for (int row = 0; row < board.length; row++) {
            for (int column = 0; column < board[0].length; column++) {
                visit(board, row, column, trie.children, result);
            }
        }
        return result;
    }

    private void insert(TrieNode root, String word) {
        TrieNode node = root;
        for (int index = 0; index < word.length(); index++) {
            node = node.children.computeIfAbsent(word.charAt(index), key -> new TrieNode());
        }
        node.word = word;
    }

    private void visit(char[][] board, int row, int column, Map<Character, TrieNode> parent,
                       List<String> result) {
        char character = board[row][column];
        TrieNode node = parent.get(character);
        if (node == null) {
            return;
        }
        if (node.word != null) {
            result.add(node.word);
            node.word = null;
        }
        board[row][column] = '#';
        exploreNeighbors(board, row, column, node.children, result);
        board[row][column] = character;
        if (node.children.isEmpty() && node.word == null) {
            parent.remove(character);
        }
    }

    private void exploreNeighbors(char[][] board, int row, int column, Map<Character, TrieNode> children,
                                  List<String> result) {
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int[] direction : directions) {
            int nextRow = row + direction[0];
            int nextColumn = column + direction[1];
            if (nextRow >= 0 && nextRow < board.length && nextColumn >= 0 && nextColumn < board[0].length) {
                visit(board, nextRow, nextColumn, children, result);
            }
        }
    }
}
