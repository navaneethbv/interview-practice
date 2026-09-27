class Solution {
    private record Bar(int start, int height) {}

    public int largestRectangleArea(int[] heights) {
        Deque<Bar> pending = new ArrayDeque<>();
        int best = 0;
        for (int index = 0; index <= heights.length; index++) {
            int height = index < heights.length ? heights[index] : 0;
            int start = index;
            while (!pending.isEmpty() && pending.peek().height() > height) {
                Bar previous = pending.pop();
                start = previous.start();
                best = Math.max(best, previous.height() * (index - start));
            }
            pending.push(new Bar(start, height));
        }
        return best;
    }
}
