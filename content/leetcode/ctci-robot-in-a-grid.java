class Solution {
    private int[][] grid;
    private boolean[][] deadEnd;
    private final List<List<Integer>> path = new ArrayList<>();

    public List<List<Integer>> findPath(int[][] grid) {
        this.grid = grid;
        deadEnd = new boolean[grid.length][grid[0].length];
        return reach(0, 0) ? path : new ArrayList<>();
    }

    private boolean reach(int row, int col) {
        if (row >= grid.length || col >= grid[0].length || grid[row][col] == 1 || deadEnd[row][col]) {
            return false;
        }
        path.add(List.of(row, col));
        boolean atTarget = row == grid.length - 1 && col == grid[0].length - 1;
        if (atTarget || reach(row, col + 1) || reach(row + 1, col)) {
            return true;
        }
        path.remove(path.size() - 1);
        deadEnd[row][col] = true;
        return false;
    }
}
