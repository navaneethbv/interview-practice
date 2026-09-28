class Solution {
    public String urlify(String value, int trueLength) {
        StringBuilder result = new StringBuilder();
        int offset = 0;
        for (int i = 0; i < trueLength; i++) {
            int current = value.codePointAt(offset);
            if (current == ' ') {
                result.append("%20");
            } else {
                result.appendCodePoint(current);
            }
            offset += Character.charCount(current);
        }
        return result.toString();
    }
}
