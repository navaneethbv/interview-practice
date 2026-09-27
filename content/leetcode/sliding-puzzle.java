class Solution {
    public int slidingPuzzle(int[][] board) {
        String start = Integer.toString(board[0][0]) + board[0][1] + board[0][2]
                + board[1][0] + board[1][1] + board[1][2];
        String target = "123450";
        int[][] neighbors = {{1, 3}, {0, 2, 4}, {1, 5}, {0, 4}, {1, 3, 5}, {2, 4}};
        Deque<String> queue = new ArrayDeque<>();
        Set<String> seen = new HashSet<>();
        queue.add(start);
        seen.add(start);
        int moves = 0;
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int count = 0; count < levelSize; count++) {
                String state = queue.remove();
                if (state.equals(target)) {
                    return moves;
                }
                int blank = state.indexOf('0');
                for (int neighbor : neighbors[blank]) {
                    char[] values = state.toCharArray();
                    values[blank] = values[neighbor];
                    values[neighbor] = '0';
                    String nextState = new String(values);
                    if (seen.add(nextState)) {
                        queue.add(nextState);
                    }
                }
            }
            moves++;
        }
        return -1;
    }
}
