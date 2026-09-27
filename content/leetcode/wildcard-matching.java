class Solution {
    public boolean isMatch(String s, String p) {
        int stringIndex = 0;
        int patternIndex = 0;
        int lastStar = -1;
        int matchedAfterStar = 0;

        while (stringIndex < s.length()) {
            if (patternIndex < p.length()
                    && (p.charAt(patternIndex) == '?'
                    || p.charAt(patternIndex) == s.charAt(stringIndex))) {
                stringIndex++;
                patternIndex++;
            } else if (patternIndex < p.length() && p.charAt(patternIndex) == '*') {
                lastStar = patternIndex;
                matchedAfterStar = stringIndex;
                patternIndex++;
            } else if (lastStar >= 0) {
                matchedAfterStar++;
                stringIndex = matchedAfterStar;
                patternIndex = lastStar + 1;
            } else {
                return false;
            }
        }

        while (patternIndex < p.length() && p.charAt(patternIndex) == '*') {
            patternIndex++;
        }
        return patternIndex == p.length();
    }
}
