class Solution {
    public int solve(int[] temperatures, int k) {
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
            while (right - left + 1 > k) {
                if (low.peekFirst() == left) {
                    low.removeFirst();
                }
                if (high.peekFirst() == left) {
                    high.removeFirst();
                }
                left++;
            }
            if (right - left + 1 == k) {
                best = Math.max(best, temperatures[high.peekFirst()] - temperatures[low.peekFirst()]);
            }
        }
        return best;
    }
}
