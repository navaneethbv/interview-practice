class Solution {
    public boolean canTransform(String start, String result) {
        int startIndex = 0;
        int resultIndex = 0;
        while (startIndex < start.length() || resultIndex < result.length()) {
            startIndex = nextPiece(start, startIndex);
            resultIndex = nextPiece(result, resultIndex);
            if (startIndex == start.length() || resultIndex == result.length()) {
                return startIndex == start.length() && resultIndex == result.length();
            }
            char character = start.charAt(startIndex);
            if (character != result.charAt(resultIndex)) {
                return false;
            }
            if (character == 'L' && resultIndex > startIndex) {
                return false;
            }
            if (character == 'R' && resultIndex < startIndex) {
                return false;
            }
            startIndex++;
            resultIndex++;
        }
        return true;
    }

    private int nextPiece(String text, int index) {
        while (index < text.length() && text.charAt(index) == 'X') {
            index++;
        }
        return index;
    }
}
