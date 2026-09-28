class Solution {
    public int[] positiveDays(int[] likes, int[] dislikes, int[][] periods) {
        int[] prefix = new int[likes.length + 1];
        for (int i = 0; i < likes.length; i++) {
            prefix[i + 1] = prefix[i] + (likes[i] > dislikes[i] ? 1 : 0);
        }
        int[] counts = new int[periods.length];
        for (int j = 0; j < periods.length; j++) {
            counts[j] = prefix[periods[j][1] + 1] - prefix[periods[j][0]];
        }
        return counts;
    }
}
