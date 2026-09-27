class Solution {
    public int snakesAndLadders(int[][] board) {
        int size = board.length;
        Queue<Integer> queue = new ArrayDeque<>();
        boolean[] visited = new boolean[size * size + 1];
        queue.add(1);
        visited[1] = true;
        int turns = 0;
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int count = 0; count < levelSize; count++) {
                int square = queue.remove();
                if (square == size * size) {
                    return turns;
                }
                for (int next = square + 1; next <= Math.min(size * size, square + 6); next++) {
                    int landing = destination(board, next);
                    if (!visited[landing]) {
                        visited[landing] = true;
                        queue.add(landing);
                    }
                }
            }
            turns++;
        }
        return -1;
    }

    private int destination(int[][] board, int square) {
        int size = board.length;
        int rowFromBottom = (square - 1) / size;
        int offset = (square - 1) % size;
        int column = rowFromBottom % 2 == 0 ? offset : size - 1 - offset;
        int value = board[size - 1 - rowFromBottom][column];
        return value == -1 ? square : value;
    }
}
