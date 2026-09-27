class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int rowCount = triangle.size();
        int[] minimumTotals = new int[rowCount + 1];

        for (int row = rowCount - 1; row >= 0; row--) {
            for (int index = 0; index <= row; index++) {
                int value = triangle.get(row).get(index);
                minimumTotals[index] = value + Math.min(
                        minimumTotals[index], minimumTotals[index + 1]);
            }
        }
        return minimumTotals[0];
    }
}
