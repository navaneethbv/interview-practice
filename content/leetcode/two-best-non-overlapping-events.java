class Solution {
    public int maxTwoEvents(int[][] events) {
        Arrays.sort(events, Comparator.comparingInt(event -> event[0]));
        int count = events.length;
        int[] suffixBest = new int[count + 1];
        for (int index = count - 1; index >= 0; index--) {
            suffixBest[index] = Math.max(suffixBest[index + 1], events[index][2]);
        }
        int best = 0;
        for (int[] event : events) {
            int left = 0;
            int right = count;
            while (left < right) {
                int middle = (left + right) / 2;
                if (events[middle][0] <= event[1]) {
                    left = middle + 1;
                } else {
                    right = middle;
                }
            }
            best = Math.max(best, event[2] + suffixBest[left]);
        }
        return best;
    }
}
