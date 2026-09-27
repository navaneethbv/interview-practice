class Solution {
    public int[][] flipAndInvertImage(int[][] image) {
        int size = image.length;
        int[][] result = new int[size][size];
        for (int row = 0; row < size; row++) {
            for (int column = 0; column < size; column++) {
                result[row][column] = 1 - image[row][size - 1 - column];
            }
        }
        return result;
    }
}
