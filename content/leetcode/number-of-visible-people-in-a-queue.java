class Solution {
    public int[] canSeePersonsCount(int[] heights) {
        int[] visible = new int[heights.length];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int index = heights.length - 1; index >= 0; index--) {
            while (!stack.isEmpty() && stack.peek() < heights[index]) {
                stack.pop();
                visible[index]++;
            }
            if (!stack.isEmpty()) {
                visible[index]++;
            }
            stack.push(heights[index]);
        }
        return visible;
    }
}
