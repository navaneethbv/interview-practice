class Solution {
    public int uniqueMorseRepresentations(String[] words) {
        String[] codes = {".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....",
                "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
                "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-",
                "-.--", "--.."};
        Set<String> representations = new HashSet<>();
        for (String word : words) {
            StringBuilder encoded = new StringBuilder();
            for (int index = 0; index < word.length(); index++) {
                encoded.append(codes[word.charAt(index) - 'a']);
            }
            representations.add(encoded.toString());
        }
        return representations.size();
    }
}
