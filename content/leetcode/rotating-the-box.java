class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int rows = boxGrid.length;
        int columns = boxGrid[0].length;
        char[][] result = new char[columns][rows];
        for (char[] row : result) {
            Arrays.fill(row, '.');
        }
        for (int row = 0; row < rows; row++) {
            fillRotatedRow(boxGrid[row], result, rows - row - 1);
        }
        return result;
    }
    private void fillRotatedRow(char[] source, char[][] result, int outputColumn) {
        int landing = source.length - 1;
        for (int column = source.length - 1; column >= 0; column--) {
            if (source[column] == '*') {
                result[column][outputColumn] = '*';
                landing = column - 1;
            }
            else if (source[column] == '#') {
                result[landing][outputColumn] = '#';
                landing--;
            }
        }
    }
}
