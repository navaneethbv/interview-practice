class Solution {
    public List<Integer> fallingSquares(int[][] positions) {
        List<int[]> placedSquares = new ArrayList<>();
        List<Integer> heights = new ArrayList<>();
        int highest = 0;
        for (int[] position : positions) {
            int left = position[0];
            int right = left + position[1];
            int baseHeight = 0;
            for (int[] placed : placedSquares) {
                if (Math.max(left, placed[0]) < Math.min(right, placed[1])) {
                    baseHeight = Math.max(baseHeight, placed[2]);
                }
            }
            int height = baseHeight + position[1];
            placedSquares.add(new int[]{left, right, height});
            highest = Math.max(highest, height);
            heights.add(highest);
        }
        return heights;
    }
}
