class Solution {
    public int minSwaps(int[][] grid) {
        int size = grid.length;
        int[] trailingZeros = new int[size];
        for (int row = 0; row < size; row++) {
            for (int column = size - 1; column >= 0 && grid[row][column] == 0; column--) {
                trailingZeros[row]++;
            }
        }

        int swaps = 0;
        for (int row = 0; row < size; row++) {
            int required = size - row - 1;
            int candidate = row;
            while (candidate < size && trailingZeros[candidate] < required) {
                candidate++;
            }
            if (candidate == size) {
                return -1;
            }
            swaps += candidate - row;
            int selected = trailingZeros[candidate];
            while (candidate > row) {
                trailingZeros[candidate] = trailingZeros[candidate - 1];
                candidate--;
            }
            trailingZeros[row] = selected;
        }
        return swaps;
    }
}
