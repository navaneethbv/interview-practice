class Solution {
    public long solve(int[] tiles) {
        Deque<Integer> stack = new ArrayDeque<>();
        long best = 0;
        for (int index = 0; index <= tiles.length; index++) {
            int height = index < tiles.length ? tiles[index] : 0;
            while (!stack.isEmpty() && tiles[stack.peekLast()] > height) {
                int previous = stack.removeLast();
                int left = stack.isEmpty() ? -1 : stack.peekLast();
                best = Math.max(best, (long) tiles[previous] * (index - left - 1));
            }
            stack.addLast(index);
        }
        return best;
    }
}
