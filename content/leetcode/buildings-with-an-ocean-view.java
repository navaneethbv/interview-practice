class Solution {
    public int[] findBuildings(int[] heights) {
        List<Integer> visibleIndices = new ArrayList<>();
        int tallestToRight = 0;

        for (int index = heights.length - 1; index >= 0; index--) {
            if (heights[index] > tallestToRight) {
                visibleIndices.add(index);
                tallestToRight = heights[index];
            }
        }

        int[] result = new int[visibleIndices.size()];
        for (int index = 0; index < result.length; index++) {
            result[index] = visibleIndices.get(result.length - 1 - index);
        }
        return result;
    }
}
