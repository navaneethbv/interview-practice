class Solution {
    public String longestPrefix(String s) {
        int[] prefixLength = new int[s.length()];
        for (int index = 1; index < s.length(); index++) {
            int candidate = prefixLength[index - 1];
            while (candidate > 0 && s.charAt(index) != s.charAt(candidate)) {
                candidate = prefixLength[candidate - 1];
            }
            if (s.charAt(index) == s.charAt(candidate)) {
                candidate++;
            }
            prefixLength[index] = candidate;
        }
        return s.substring(0, prefixLength[prefixLength.length - 1]);
    }
}
