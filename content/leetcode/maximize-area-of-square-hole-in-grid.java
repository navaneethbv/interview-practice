class Solution {
    private int opening(int[] bars) {
        Arrays.sort(bars);
        int best = 2;
        int current = 2;
        for (int index = 1; index < bars.length; index++) {
            if (bars[index] == bars[index - 1] + 1) {
                current++;
            } else {
                current = 2;
            }
            best = Math.max(best, current);
        }
        return best;
    }

    public int maximizeSquareHoleArea(int n, int m, int[] hBars, int[] vBars) {
        int side = Math.min(opening(hBars), opening(vBars));
        return side * side;
    }
}
