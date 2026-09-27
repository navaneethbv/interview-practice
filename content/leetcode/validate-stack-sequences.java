class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        Deque<Integer> stack = new ArrayDeque<>();
        int nextPop = 0;
        for (int value : pushed) {
            stack.push(value);
            while (!stack.isEmpty() && nextPop < popped.length && stack.peek() == popped[nextPop]) {
                stack.pop();
                nextPop++;
            }
        }
        return stack.isEmpty();
    }
}
