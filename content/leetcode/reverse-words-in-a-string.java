class Solution {
    public String reverseWords(String s) {
        String[] words = s.trim().split(" +");
        StringBuilder reversed = new StringBuilder();
        for (int index = words.length - 1; index >= 0; index--) {
            if (reversed.length() > 0) {
                reversed.append(' ');
            }
            reversed.append(words[index]);
        }
        return reversed.toString();
    }
}
