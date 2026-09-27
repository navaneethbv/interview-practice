class Solution {
    public int calculate(String s) {
        Deque<Integer> terms = new ArrayDeque<>();
        int number = 0;
        char operator = '+';
        for (char character : (s + "+").toCharArray()) {
            if (Character.isDigit(character)) {
                number = number * 10 + character - '0';
            } else if (character != ' ') {
                applyOperator(terms, operator, number);
                number = 0;
                operator = character;
            }
        }
        int total = 0;
        for (int term : terms) {
            total += term;
        }
        return total;
    }

    private void applyOperator(Deque<Integer> terms, char operator, int number) {
        if (operator == '+') {
            terms.push(number);
        } else if (operator == '-') {
            terms.push(-number);
        } else if (operator == '*') {
            terms.push(terms.pop() * number);
        } else {
            terms.push(terms.pop() / number);
        }
    }
}
