class Solution {
    public int longestPalindrome(String s) {
        int[] counts = new int[128];
        for (int characterIndex = 0; characterIndex < s.length(); characterIndex++) {
            char character = s.charAt(characterIndex);
            counts[character]++;
        }

        int pairedLength = 0;
        for (int count : counts) {
            pairedLength += count / 2 * 2;
        }
        return pairedLength + (pairedLength < s.length() ? 1 : 0);
    }
}
