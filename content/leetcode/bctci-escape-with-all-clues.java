class Solution {
    private static final int[][] STEPS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    private int[][] room;
    private boolean[][] visited;
    private int clues;
    private final List<List<Integer>> path = new ArrayList<>();
    private List<List<Integer>> best;

    public List<List<Integer>> collectClues(int[][] room) {
        this.room = room;
        visited = new boolean[room.length][room[0].length];
        for (int[] row : room) {
            for (int cell : row) {
                if (cell == 2) {
                    clues++;
                }
            }
        }
        visited[0][0] = true;
        path.add(List.of(0, 0));
        walk(0, 0, 0);
        return best == null ? new ArrayList<>() : best;
    }

    private void walk(int r, int c, int found) {
        if (found == clues) {
            if (best == null || path.size() < best.size()) {
                best = new ArrayList<>(path);
            }
            return;
        }
        if (best != null && path.size() + (clues - found) >= best.size()) {
            return;
        }
        for (int[] step : STEPS) {
            int nr = r + step[0];
            int nc = c + step[1];
            if (nr >= 0 && nr < room.length && nc >= 0 && nc < room[0].length && room[nr][nc] != 1 && !visited[nr][nc]) {
                visited[nr][nc] = true;
                path.add(List.of(nr, nc));
                walk(nr, nc, found + (room[nr][nc] == 2 ? 1 : 0));
                path.remove(path.size() - 1);
                visited[nr][nc] = false;
            }
        }
    }
}
