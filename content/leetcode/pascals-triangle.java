class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();
        for (int rowIndex = 0; rowIndex < numRows; rowIndex++) {
            List<Integer> row = new ArrayList<>();
            for (int column = 0; column <= rowIndex; column++) {
                if (column == 0 || column == rowIndex) {
                    row.add(1);
                } else {
                    List<Integer> previousRow = triangle.get(rowIndex - 1);
                    row.add(previousRow.get(column - 1) + previousRow.get(column));
                }
            }
            triangle.add(row);
        }
        return triangle;
    }
}
