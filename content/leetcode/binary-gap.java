class Solution {
    public int binaryGap(int n) {
        int previousOne = -1;
        int best = 0;
        int position = 0;
        while (n > 0) {
            if ((n & 1) != 0) {
                if (previousOne >= 0) {
                    best = Math.max(best, position - previousOne);
                }
                previousOne = position;
            }
            n >>>= 1;
            position++;
        }
        return best;
    }
}
