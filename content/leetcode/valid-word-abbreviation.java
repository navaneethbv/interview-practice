class Solution {
    public boolean validWordAbbreviation(String word, String abbr) {
        int wordIndex = 0;
        int abbreviationIndex = 0;

        while (abbreviationIndex < abbr.length()) {
            char character = abbr.charAt(abbreviationIndex);
            if (Character.isDigit(character)) {
                if (character == '0') {
                    return false;
                }
                long[] count = new long[1];
                abbreviationIndex = readNumber(abbr, abbreviationIndex, count);
                if (count[0] > word.length() - wordIndex) {
                    return false;
                }
                wordIndex += (int) count[0];
            } else {
                if (wordIndex >= word.length()
                        || word.charAt(wordIndex) != character) {
                    return false;
                }
                wordIndex++;
                abbreviationIndex++;
            }
        }

        return wordIndex == word.length();
    }

    private int readNumber(String abbr, int start, long[] count) {
        int index = start;
        while (index < abbr.length() && Character.isDigit(abbr.charAt(index))) {
            count[0] = count[0] * 10 + (abbr.charAt(index) - '0');
            index++;
        }
        return index;
    }
}
