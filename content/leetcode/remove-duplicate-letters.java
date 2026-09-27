class Solution {
    public String removeDuplicateLetters(String s) {
        int[] remaining = new int[26];
        boolean[] used = new boolean[26];
        for (int index = 0; index < s.length(); index++) {
            remaining[s.charAt(index) - 'a']++;
        }
        StringBuilder stack = new StringBuilder();
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            remaining[character - 'a']--;
            if (used[character - 'a']) {
                continue;
            }
            removeLargerReusable(stack, used, remaining, character);
            stack.append(character);
            used[character - 'a'] = true;
        }
        return stack.toString();
    }

    private void removeLargerReusable(StringBuilder stack, boolean[] used,
            int[] remaining, char character) {
        while (stack.length() > 0
                && stack.charAt(stack.length() - 1) > character
                && remaining[stack.charAt(stack.length() - 1) - 'a'] > 0) {
            int index = stack.charAt(stack.length() - 1) - 'a';
            used[index] = false;
            stack.setLength(stack.length() - 1);
        }
    }
}
