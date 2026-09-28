class Solution {
    private static final int FIRST_YEAR = 1900;
    private static final int LAST_YEAR = 2000;

    public int maxAliveYear(int[] birth, int[] death) {
        int[] deltas = new int[LAST_YEAR - FIRST_YEAR + 2];
        for (int i = 0; i < birth.length; i++) {
            deltas[birth[i] - FIRST_YEAR]++;
            deltas[death[i] - FIRST_YEAR + 1]--;
        }
        int alive = 0;
        int best = 0;
        int bestYear = FIRST_YEAR;
        for (int offset = 0; offset <= LAST_YEAR - FIRST_YEAR; offset++) {
            alive += deltas[offset];
            if (alive > best) {
                best = alive;
                bestYear = FIRST_YEAR + offset;
            }
        }
        return bestYear;
    }
}
