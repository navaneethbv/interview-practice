class Solution {
    public int minFlips(String s) {
        int length = s.length();
        int mismatch = 0;
        int best = length;
        for (int index = 0; index < 2 * length; index++) {
            int current = s.charAt(index % length) - '0';
            if (current != index % 2) {
                mismatch++;
            }
            if (index >= length) {
                int oldIndex = index - length;
                if (s.charAt(oldIndex) - '0' != oldIndex % 2) {
                    mismatch--;
                }
            }
            if (index >= length - 1) {
                best = Math.min(best, Math.min(mismatch, length - mismatch));
            }
        }
        return best;
    }
}
