class Solution {
    private void search(String num, int target, int index, String expression,
            long value, long lastOperand, List<String> expressions) {
        if (index == num.length()) {
            if (value == target) {
                expressions.add(expression);
            }
            return;
        }
        for (int end = index + 1; end <= num.length(); end++) {
            if (end > index + 1 && num.charAt(index) == '0') {
                break;
            }
            String token = num.substring(index, end);
            long operand = Long.parseLong(token);
            if (index == 0) {
                search(num, target, end, token, operand, operand, expressions);
                continue;
            }
            search(num, target, end, expression + "+" + token,
                    value + operand, operand, expressions);
            search(num, target, end, expression + "-" + token,
                    value - operand, -operand, expressions);
            long multipliedValue = value - lastOperand + lastOperand * operand;
            search(num, target, end, expression + "*" + token,
                    multipliedValue, lastOperand * operand, expressions);
        }
    }

    public List<String> addOperators(String num, int target) {
        List<String> expressions = new ArrayList<>();
        search(num, target, 0, "", 0, 0, expressions);
        return expressions;
    }
}
