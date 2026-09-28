class Solution {
    public long maxDeviation(int[] likes, int[] dislikes) {
        int n = likes.length;
        long[] scores = new long[n];
        long total = 0;
        for (int i = 0; i < n; i++) {
            scores[i] = likes[i] - dislikes[i];
            total += scores[i];
        }
        Arrays.sort(scores);
        long best = 0;
        long below = 0;
        for (int index = 0; index < n; index++) {
            long above = total - below - scores[index];
            long deviation = scores[index] * index - below + above - scores[index] * (n - index - 1);
            best = Math.max(best, deviation);
            below += scores[index];
        }
        return best;
    }
}
