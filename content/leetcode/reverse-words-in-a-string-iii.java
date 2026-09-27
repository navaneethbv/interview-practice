class Solution {
    public String reverseWords(String s) {
        String[] words = s.split(" ");
        for (int index = 0; index < words.length; index++) {
            words[index] = new StringBuilder(words[index]).reverse().toString();
        }
        return String.join(" ", words);
    }
}
