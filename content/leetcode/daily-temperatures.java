class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        Deque<Integer> pending = new ArrayDeque<>();
        int[] result = new int[temperatures.length];
        for (int index = 0; index < temperatures.length; index++) {
            while (!pending.isEmpty() && temperatures[pending.peek()] < temperatures[index]) {
                int previous = pending.pop();
                result[previous] = index - previous;
            }
            pending.push(index);
        }
        return result;
    }
}
