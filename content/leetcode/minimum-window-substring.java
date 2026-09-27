class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128];
        for (int index = 0; index < t.length(); index++) {
            need[t.charAt(index)]++;
        }
        int missing = t.length();
        int left = 0;
        int bestStart = 0;
        int bestLength = Integer.MAX_VALUE;
        for (int right = 0; right < s.length(); right++) {
            char character = s.charAt(right);
            if (need[character] > 0) {
                missing--;
            }
            need[character]--;
            while (missing == 0) {
                if (right - left + 1 < bestLength) {
                    bestStart = left;
                    bestLength = right - left + 1;
                }
                char removed = s.charAt(left);
                need[removed]++;
                if (need[removed] > 0) {
                    missing++;
                }
                left++;
            }
        }
        return bestLength == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLength);
    }
}
