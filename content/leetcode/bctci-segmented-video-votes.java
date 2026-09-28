class Solution {
    public int[] netVotes(int n, int[][] votes) {
        int[] delta = new int[n + 1];
        for (int[] vote : votes) {
            delta[vote[0]] += vote[2];
            delta[vote[1] + 1] -= vote[2];
        }
        int[] result = new int[n];
        int running = 0;
        for (int minute = 0; minute < n; minute++) {
            running += delta[minute];
            result[minute] = running;
        }
        return result;
    }
}
