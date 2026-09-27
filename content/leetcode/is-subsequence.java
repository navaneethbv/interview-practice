class Solution {
    public boolean isSubsequence(String s, String t) {
        int sourceIndex = 0;
        for (int index = 0; index < t.length(); index++) {
            if (sourceIndex < s.length()
                    && s.charAt(sourceIndex) == t.charAt(index)) {
                sourceIndex++;
            }
        }
        return sourceIndex == s.length();
    }
}
