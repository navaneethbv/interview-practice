class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            if (pairs.containsKey(character)) {
                if (stack.isEmpty() || stack.pop().charValue() != pairs.get(character).charValue()) {
                    return false;
                }
            } else {
                stack.push(character);
            }
        }
        return stack.isEmpty();
    }
}
