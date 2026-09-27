class Solution {
    public String decodeString(String s) {
        Deque<Integer> repeatCounts = new ArrayDeque<>();
        Deque<StringBuilder> previousTexts = new ArrayDeque<>();
        StringBuilder currentText = new StringBuilder();
        int repeatCount = 0;
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            if (character >= '0' && character <= '9') {
                repeatCount = repeatCount * 10 + character - '0';
            } else if (character == '[') {
                repeatCounts.push(repeatCount);
                previousTexts.push(currentText);
                currentText = new StringBuilder();
                repeatCount = 0;
            } else if (character == ']') {
                int count = repeatCounts.pop();
                String repeatedText = currentText.toString();
                currentText = previousTexts.pop();
                for (int copy = 0; copy < count; copy++) {
                    currentText.append(repeatedText);
                }
            } else {
                currentText.append(character);
            }
        }
        return currentText.toString();
    }
}
