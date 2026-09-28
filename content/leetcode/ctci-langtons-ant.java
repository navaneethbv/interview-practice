class Solution {
    private static final char[] HEADINGS = {'R', 'D', 'L', 'U'};
    private static final int[][] STEPS = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

    public List<String> printKMoves(int K) {
        Set<Long> black = new HashSet<>();
        int row = 0;
        int col = 0;
        int heading = 0;
        int top = 0;
        int bottom = 0;
        int left = 0;
        int right = 0;
        for (int move = 0; move < K; move++) {
            long key = key(row, col);
            if (black.remove(key)) {
                heading = (heading + 3) % 4;
            } else {
                black.add(key);
                heading = (heading + 1) % 4;
            }
            row += STEPS[heading][0];
            col += STEPS[heading][1];
            top = Math.min(top, row);
            bottom = Math.max(bottom, row);
            left = Math.min(left, col);
            right = Math.max(right, col);
        }
        List<String> lines = new ArrayList<>();
        for (int r = top; r <= bottom; r++) {
            StringBuilder line = new StringBuilder();
            for (int c = left; c <= right; c++) {
                if (r == row && c == col) {
                    line.append(HEADINGS[heading]);
                } else {
                    line.append(black.contains(key(r, c)) ? 'X' : '_');
                }
            }
            lines.add(line.toString());
        }
        return lines;
    }

    private long key(int row, int col) {
        return ((long) row << 32) ^ (col & 0xffffffffL);
    }
}
