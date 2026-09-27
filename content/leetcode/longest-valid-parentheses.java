class Solution {
    public int longestValidParentheses(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(-1);
        int longest = 0;
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == '(') {
                stack.push(index);
                continue;
            }
            stack.pop();
            if (stack.isEmpty()) {
                stack.push(index);
            } else {
                longest = Math.max(longest, index - stack.peek());
            }
        }
        return longest;
    }
}
