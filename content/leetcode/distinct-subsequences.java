class Solution {
    public int numDistinct(String s, String t) {
        long[] ways = new long[t.length() + 1];
        ways[0] = 1;

        for (int characterIndex = 0; characterIndex < s.length(); characterIndex++) {
            char sourceCharacter = s.charAt(characterIndex);
            for (int targetIndex = t.length() - 1; targetIndex >= 0; targetIndex--) {
                if (sourceCharacter == t.charAt(targetIndex)) {
                    ways[targetIndex + 1] = Math.min(
                            Integer.MAX_VALUE,
                            ways[targetIndex + 1] + ways[targetIndex]
                    );
                }
            }
        }
        return (int) ways[t.length()];
    }
}
