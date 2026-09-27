class Solution {
    public String toGoatLatin(String sentence) {
        String[] words = sentence.split(" ");
        for (int index = 0; index < words.length; index++) {
            String word = words[index];
            if ("aeiouAEIOU".indexOf(word.charAt(0)) < 0) {
                word = word.substring(1) + word.charAt(0);
            }
            words[index] = word + "ma" + "a".repeat(index + 1);
        }
        return String.join(" ", words);
    }
}
