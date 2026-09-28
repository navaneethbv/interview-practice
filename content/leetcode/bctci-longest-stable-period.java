class Solution {
    public int solve(int[] temperatures, int t) {
        Deque<Integer> low = new ArrayDeque<>();
        Deque<Integer> high = new ArrayDeque<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < temperatures.length; right++) {
            while (!low.isEmpty() && temperatures[low.peekLast()] >= temperatures[right]) {
                low.removeLast();
            }
            while (!high.isEmpty() && temperatures[high.peekLast()] <= temperatures[right]) {
                high.removeLast();
            }
            low.addLast(right);
            high.addLast(right);
            while (temperatures[high.peekFirst()] - temperatures[low.peekFirst()] > t) {
                if (low.peekFirst() == left) {
                    low.removeFirst();
                }
                if (high.peekFirst() == left) {
                    high.removeFirst();
                }
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
