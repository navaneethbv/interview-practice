class Solution {
    public long[] compress(int[] arr) {
        Deque<Long> stack = new ArrayDeque<>();
        for (int item : arr) {
            long value = item;
            while (!stack.isEmpty() && stack.peek() == value) {
                value += stack.pop();
            }
            stack.push(value);
        }
        long[] result = new long[stack.size()];
        for (int index = result.length - 1; index >= 0; index--) {
            result[index] = stack.pop();
        }
        return result;
    }
}
