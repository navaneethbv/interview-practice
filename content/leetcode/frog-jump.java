class Solution {
    public boolean canCross(int[] stones) {
        Map<Long, Set<Integer>> jumps = new HashMap<>();
        for (int stone : stones) {
            jumps.put((long) stone, new HashSet<>());
        }
        jumps.get(0L).add(0);
        for (int position : stones) {
            for (int previousJump : jumps.get((long) position)) {
                for (int jumpSize = previousJump - 1; jumpSize <= previousJump + 1; jumpSize++) {
                    long landing = (long) position + jumpSize;
                    if (jumpSize > 0 && jumps.containsKey(landing)) {
                        jumps.get(landing).add(jumpSize);
                    }
                }
            }
        }
        return !jumps.get((long) stones[stones.length - 1]).isEmpty();
    }
}
