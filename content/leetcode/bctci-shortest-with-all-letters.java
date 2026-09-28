class Solution {
    public int shortestWithAllLetters(String s1, String s2) {
        int[] need = new int[26];
        int missing = 0;
        for (char letter : s2.toCharArray()) {
            if (need[letter - 'a']++ == 0) {
                missing++;
            }
        }
        boolean[] required = new boolean[26];
        for (char letter : s2.toCharArray()) {
            required[letter - 'a'] = true;
        }
        int left = 0;
        int best = s1.length() + 1;
        for (int right = 0; right < s1.length(); right++) {
            int letter = s1.charAt(right) - 'a';
            if (required[letter] && --need[letter] == 0) {
                missing--;
            }
            while (missing == 0) {
                best = Math.min(best, right - left + 1);
                int leaving = s1.charAt(left++) - 'a';
                if (required[leaving] && ++need[leaving] == 1) {
                    missing++;
                }
            }
        }
        return best <= s1.length() ? best : -1;
    }
}
