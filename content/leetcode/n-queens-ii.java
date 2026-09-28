class Solution {
    public int totalNQueens(int n) {
        int mask = (1 << n) - 1;
        return search(mask, 0, 0, 0);
    }

    private int search(int mask, int columns, int leftDiagonals, int rightDiagonals) {
        if (columns == mask) {
            return 1;
        }
        int choices = mask & ~(columns | leftDiagonals | rightDiagonals);
        int total = 0;
        while (choices != 0) {
            int bit = choices & -choices;
            choices -= bit;
            total += search(mask, columns | bit, ((leftDiagonals | bit) << 1) & mask,
                    (rightDiagonals | bit) >> 1);
        }
        return total;
    }
}
