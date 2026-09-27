class Solution {
public String removeOuterParentheses(String s) {
    int depth = 0;
    StringBuilder result = new StringBuilder();
    for (char character : s.toCharArray()) {
        if (character == ')') {
            depth--;
        }
        if (depth > 0) {
            result.append(character);
        }
        if (character == '(') {
            depth++;
        }
    }
    return result.toString();
}
}
