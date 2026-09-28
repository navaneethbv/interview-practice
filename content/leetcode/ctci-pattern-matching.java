class Solution {
    public boolean doesMatch(String pattern, String value) {
        if (pattern.isEmpty()) {
            return value.isEmpty();
        }
        char main = pattern.charAt(0);
        char alternate = main == 'a' ? 'b' : 'a';
        int mainCount = countOf(pattern, main);
        int alternateCount = pattern.length() - mainCount;
        int firstAlternate = pattern.indexOf(alternate);
        for (int mainLength = 1; mainLength <= value.length() / mainCount; mainLength++) {
            int remaining = value.length() - mainLength * mainCount;
            if (alternateCount == 0) {
                if (remaining == 0 && matches(pattern, value, mainLength, 0, 0)) {
                    return true;
                }
                continue;
            }
            if (remaining <= 0 || remaining % alternateCount != 0) {
                continue;
            }
            int alternateLength = remaining / alternateCount;
            int alternateStart = firstAlternate * mainLength;
            if (matches(pattern, value, mainLength, alternateStart, alternateLength)) {
                return true;
            }
        }
        return false;
    }

    private int countOf(String pattern, char letter) {
        int count = 0;
        for (char c : pattern.toCharArray()) {
            if (c == letter) {
                count++;
            }
        }
        return count;
    }

    private boolean matches(String pattern, String value, int mainLength, int alternateStart, int alternateLength) {
        String mainWord = value.substring(0, mainLength);
        String alternateWord = value.substring(alternateStart, alternateStart + alternateLength);
        StringBuilder built = new StringBuilder();
        for (char letter : pattern.toCharArray()) {
            built.append(letter == pattern.charAt(0) ? mainWord : alternateWord);
            if (built.length() > value.length()) {
                return false;
            }
        }
        return built.toString().equals(value);
    }
}
