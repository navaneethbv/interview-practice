class Solution {
    public boolean wordPattern(String pattern, String s) {
        String[] words = s.split(" ");
        if (words.length != pattern.length()) {
            return false;
        }

        Map<Character, String> patternToWord = new HashMap<>();
        Map<String, Character> wordToPattern = new HashMap<>();
        for (int index = 0; index < pattern.length(); index++) {
            char symbol = pattern.charAt(index);
            String word = words[index];
            if (patternToWord.containsKey(symbol) && !patternToWord.get(symbol).equals(word)) {
                return false;
            }
            if (wordToPattern.containsKey(word) && wordToPattern.get(word) != symbol) {
                return false;
            }
            patternToWord.put(symbol, word);
            wordToPattern.put(word, symbol);
        }
        return true;
    }
}
