class Solution {
    public String bestHand(int[] ranks, char[] suits) {
        boolean flush = true;
        for (int index = 1; index < suits.length; index++) {
            if (suits[index] != suits[0]) {
                flush = false;
                break;
            }
        }
        if (flush) {
            return "Flush";
        }
        Map<Integer, Integer> counts = new HashMap<>();
        int largestCount = 0;
        for (int rank : ranks) {
            int count = counts.getOrDefault(rank, 0) + 1;
            counts.put(rank, count);
            largestCount = Math.max(largestCount, count);
        }
        if (largestCount >= 3) {
            return "Three of a Kind";
        }
        if (largestCount == 2) {
            return "Pair";
        }
        return "High Card";
    }
}
