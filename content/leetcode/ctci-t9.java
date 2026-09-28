class Solution {
    private static final String[] LETTERS = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

    public List<String> getValidT9Words(String digits, String[] words) {
        char[] keyOf = new char[26];
        for (int digit = 2; digit <= 9; digit++) {
            for (char letter : LETTERS[digit].toCharArray()) {
                keyOf[letter - 'a'] = (char) ('0' + digit);
            }
        }
        List<String> matches = new ArrayList<>();
        for (String word : words) {
            if (word.length() == digits.length() && spells(word, digits, keyOf)) {
                matches.add(word);
            }
        }
        return matches;
    }

    private boolean spells(String word, String digits, char[] keyOf) {
        for (int i = 0; i < word.length(); i++) {
            if (keyOf[word.charAt(i) - 'a'] != digits.charAt(i)) {
                return false;
            }
        }
        return true;
    }
}
