class Solution {
    public String removeDuplicates(String s) {
        StringBuilder stack = new StringBuilder();
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            if (!stack.isEmpty() && stack.charAt(stack.length() - 1) == character) {
                stack.setLength(stack.length() - 1);
            } else {
                stack.append(character);
            }
        }
        return stack.toString();
    }
}
