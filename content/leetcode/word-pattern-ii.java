class Solution {
    public boolean wordPatternMatch(String pattern, String s) {
        return search(pattern, s, 0, 0, new HashMap<>(), new HashSet<>());
    }

    private boolean search(String pattern, String text, int patternIndex, int textIndex,
                           Map<Character, String> mapping, Set<String> usedWords) {
        int remainingPattern = pattern.length() - patternIndex;
        int remainingText = text.length() - textIndex;
        if (remainingText < remainingPattern) {
            return false;
        }
        if (patternIndex == pattern.length()) {
            return textIndex == text.length();
        }
        char symbol = pattern.charAt(patternIndex);
        if (mapping.containsKey(symbol)) {
            String word = mapping.get(symbol);
            return text.startsWith(word, textIndex)
                    && search(pattern, text, patternIndex + 1, textIndex + word.length(), mapping, usedWords);
        }
        for (int end = textIndex + 1; end <= text.length(); end++) {
            String word = text.substring(textIndex, end);
            if (usedWords.contains(word)) {
                continue;
            }
            mapping.put(symbol, word);
            usedWords.add(word);
            if (search(pattern, text, patternIndex + 1, end, mapping, usedWords)) {
                return true;
            }
            usedWords.remove(word);
            mapping.remove(symbol);
        }
        return false;
    }
}
