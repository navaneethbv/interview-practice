class Solution {
    public boolean areNested(int[][] circles) {
        int[][] ordered = circles.clone();
        Arrays.sort(ordered, (a, b) -> b[2] - a[2]);
        for (int i = 0; i + 1 < ordered.length; i++) {
            int[] outer = ordered[i];
            int[] inner = ordered[i + 1];
            long gap = outer[2] - inner[2];
            long dx = outer[0] - inner[0];
            long dy = outer[1] - inner[1];
            if (gap <= 0 || dx * dx + dy * dy >= gap * gap) {
                return false;
            }
        }
        return true;
    }
}
