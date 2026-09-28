class Solution {
    public boolean[] solve(int[] street) {
        int k = street.length;

        boolean[] answer = new boolean[street.length];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int index = 0; index < street.length; index++) {
            while (!stack.isEmpty() && street[stack.peekLast()] >= street[index]) {
                stack.removeLast();
            }
            answer[index] = !stack.isEmpty() && index - stack.peekLast() <= k;
            stack.addLast(index);
        }
        stack.clear();
        for (int index = street.length - 1; index >= 0; index--) {
            while (!stack.isEmpty() && street[stack.peekLast()] <= street[index]) {
                stack.removeLast();
            }
            answer[index] = answer[index] && !stack.isEmpty() && stack.peekLast() - index <= k;
            stack.addLast(index);
        }
        return answer;
    }
}
