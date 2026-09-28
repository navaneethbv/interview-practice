class Solution {
    public String toLowerCase(String s) {
        StringBuilder result = new StringBuilder();
        for (char character : s.toCharArray()) {
            if (character >= 'A' && character <= 'Z') {
                result.append((char) (character + 32));
            } else {
                result.append(character);
            }
        }
        return result.toString();
    }
}
