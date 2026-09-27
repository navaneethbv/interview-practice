class Solution {
    public int minKnightMoves(int x, int y) {
        x = Math.abs(x);
        y = Math.abs(y);
        if (x < y) {
            int temporary = x;
            x = y;
            y = temporary;
        }
        if (x == 1 && y == 0) {
            return 3;
        }
        if (x == 2 && y == 2) {
            return 4;
        }
        int minimumMoves = Math.max((x + 1) / 2, (x + y + 2) / 3);
        return minimumMoves + (minimumMoves + x + y) % 2;
    }
}
