class Solution {
public int numTilings(int n) {
    long[] ways = new long[Math.max(3, n + 1)];
    ways[0] = 1;
    ways[1] = 1;
    ways[2] = 2;
    for (int width = 3; width <= n; width++) {
        ways[width] = (2 * ways[width - 1] + ways[width - 3]) % 1000000007;
    }
    return (int) ways[n];
}
}
