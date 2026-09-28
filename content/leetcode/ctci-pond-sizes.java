class Solution {
    public List<Integer> pondSizes(int[][] land) {
        boolean[][] visited = new boolean[land.length][land[0].length];
        List<Integer> sizes = new ArrayList<>();
        for (int row = 0; row < land.length; row++) {
            for (int col = 0; col < land[0].length; col++) {
                if (land[row][col] == 0 && !visited[row][col]) {
                    sizes.add(fill(land, visited, row, col));
                }
            }
        }
        Collections.sort(sizes);
        return sizes;
    }

    private int fill(int[][] land, boolean[][] visited, int row, int col) {
        visited[row][col] = true;
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[] {row, col});
        int size = 0;
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            size++;
            for (int dr = -1; dr <= 1; dr++) {
                for (int dc = -1; dc <= 1; dc++) {
                    int nr = cell[0] + dr;
                    int nc = cell[1] + dc;
                    boolean inside = nr >= 0 && nr < land.length && nc >= 0 && nc < land[0].length;
                    if (inside && land[nr][nc] == 0 && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        stack.push(new int[] {nr, nc});
                    }
                }
            }
        }
        return size;
    }
}
