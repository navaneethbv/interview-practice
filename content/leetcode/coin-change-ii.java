class Solution {
    public int change(int amount, int[] coins) {
        long[] ways = new long[amount + 1];
        ways[0] = 1;

        for (int coin : coins) {
            for (int value = coin; value <= amount; value++) {
                ways[value] = Math.min(
                        Integer.MAX_VALUE,
                        ways[value] + ways[value - coin]);
            }
        }

        return (int) ways[amount];
    }
}
