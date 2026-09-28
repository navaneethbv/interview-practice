class Solution {
    public int[] sortStack(int[] stack) {
        Deque<Integer> source = new ArrayDeque<>();
        for (int value : stack) {
            source.push(value);
        }
        Deque<Integer> ordered = new ArrayDeque<>();
        while (!source.isEmpty()) {
            int value = source.pop();
            while (!ordered.isEmpty() && ordered.peek() < value) {
                source.push(ordered.pop());
            }
            ordered.push(value);
        }
        int[] result = new int[ordered.size()];
        for (int index = result.length - 1; index >= 0; index--) {
            result[index] = ordered.pop();
        }
        return result;
    }
}
