class Solution {
    public char repeatedCharacter(String s) {
        boolean[] seen = new boolean[26];
        for (int index = 0; index < s.length(); index++) {
            char c = s.charAt(index);
            if (seen[c - 'a']) {
                return c;
            }
            seen[c - 'a'] = true;
        }
        throw new IllegalArgumentException("No repeated character");
    }
}
