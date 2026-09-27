class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder merged = new StringBuilder();
        int length = Math.max(word1.length(), word2.length());
        for (int index = 0; index < length; index++) {
            if (index < word1.length()) {
                merged.append(word1.charAt(index));
            }
            if (index < word2.length()) {
                merged.append(word2.charAt(index));
            }
        }
        return merged.toString();
    }
}
