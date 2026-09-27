class Solution {
    public int calculate(String s) {
        int total = 0;
        int sign = 1;
        int number = 0;
        Deque<int[]> stack = new ArrayDeque<>();
        for (int characterIndex = 0; characterIndex < s.length(); characterIndex++) {
            char character = s.charAt(characterIndex);
            if (Character.isDigit(character)) {
                number = number * 10 + character - '0';
            } else if (character == '+' || character == '-') {
                total += sign * number;
                number = 0;
                sign = character == '+' ? 1 : -1;
            } else if (character == '(') {
                stack.push(new int[] {total, sign});
                total = 0;
                sign = 1;
            } else if (character == ')') {
                total += sign * number;
                number = 0;
                int[] outerState = stack.pop();
                total = outerState[0] + outerState[1] * total;
            }
        }
        return total + sign * number;
    }
}
