class Solution {
    public int[][] multiply(int[][] mat1, int[][] mat2) {
        int[][] result = new int[mat1.length][mat2[0].length];
        for (int row = 0; row < mat1.length; row++) {
            for (int shared = 0; shared < mat2.length; shared++) {
                if (mat1[row][shared] == 0) {
                    continue;
                }
                for (int column = 0; column < mat2[0].length; column++) {
                    if (mat2[shared][column] != 0) {
                        result[row][column] += mat1[row][shared] * mat2[shared][column];
                    }
                }
            }
        }
        return result;
    }
}
