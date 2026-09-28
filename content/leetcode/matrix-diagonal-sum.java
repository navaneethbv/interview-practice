class Solution {
    public int diagonalSum(int[][] mat) {
        int size = mat.length;
        int total = 0;
        for (int index = 0; index < size; index++) {
            total += mat[index][index];
            int opposite = size - index - 1;
            if (opposite != index) {
                total += mat[index][opposite];
            }
        }
        return total;
    }
}
