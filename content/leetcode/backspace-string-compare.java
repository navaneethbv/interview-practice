class Solution {
    public boolean backspaceCompare(String s, String t) {
        return type(s).equals(type(t));
    }

    private String type(String text) {
        StringBuilder typedCharacters = new StringBuilder();
        for (char character : text.toCharArray()) {
            if (character == '#') {
                if (typedCharacters.length() > 0) {
                    typedCharacters.setLength(typedCharacters.length() - 1);
                }
            } else {
                typedCharacters.append(character);
            }
        }
        return typedCharacters.toString();
    }
}
