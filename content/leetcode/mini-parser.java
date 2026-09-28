class Solution {
    public NestedInteger deserialize(String s) {
        if (s.charAt(0) != '[') {
            return new NestedInteger(Integer.parseInt(s));
        }
        ArrayDeque<NestedInteger> stack = new ArrayDeque<>();
        for (int index = 0; index < s.length();) {
            char character = s.charAt(index);
            if (character == '[') {
                NestedInteger value = new NestedInteger();
                if (!stack.isEmpty()) {
                    stack.peek().add(value);
                }
                stack.push(value);
                index++;
                continue;
            }
            if (character == ']') {
                NestedInteger value = stack.pop();
                index++;
                if (stack.isEmpty()) {
                    return value;
                }
                continue;
            }
            if (character == ',') {
                index++;
                continue;
            }
            int[] number = readNumber(s, index);
            stack.peek().add(new NestedInteger(number[0]));
            index = number[1];
        }
        return new NestedInteger();
    }

    private int[] readNumber(String s, int start) {
        int end = start + 1;
        while (end < s.length() && Character.isDigit(s.charAt(end))) {
            end++;
        }
        return new int[]{Integer.parseInt(s.substring(start, end)), end};
    }
}
