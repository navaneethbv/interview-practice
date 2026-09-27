class Solution {
    public boolean isMatch(String s, String p) {
        boolean[][] matches = new boolean[s.length() + 1][p.length() + 1];
        matches[0][0] = true;
        initializeEmptyStringMatches(p, matches);

        for (int stringIndex = 1; stringIndex <= s.length(); stringIndex++) {
            for (int patternIndex = 1; patternIndex <= p.length(); patternIndex++) {
                matches[stringIndex][patternIndex] = matchCell(
                        s, p, matches, stringIndex, patternIndex
                );
            }
        }
        return matches[s.length()][p.length()];
    }

    private void initializeEmptyStringMatches(String p, boolean[][] matches) {
        for (int patternIndex = 2; patternIndex <= p.length(); patternIndex++) {
            if (p.charAt(patternIndex - 1) == '*') {
                matches[0][patternIndex] = matches[0][patternIndex - 2];
            }
        }
    }

    private boolean matchCell(
            String s,
            String p,
            boolean[][] matches,
            int stringIndex,
            int patternIndex
    ) {
        char patternCharacter = p.charAt(patternIndex - 1);
        if (patternCharacter == '*') {
            boolean skipPattern = matches[stringIndex][patternIndex - 2];
            char repeatedCharacter = p.charAt(patternIndex - 2);
            boolean consumesCharacter = repeatedCharacter == '.'
                    || repeatedCharacter == s.charAt(stringIndex - 1);
            return skipPattern
                    || (consumesCharacter
                    && matches[stringIndex - 1][patternIndex]);
        }

        boolean sameCharacter = patternCharacter == '.'
                || patternCharacter == s.charAt(stringIndex - 1);
        return sameCharacter && matches[stringIndex - 1][patternIndex - 1];
    }
}
