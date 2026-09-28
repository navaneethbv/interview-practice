class Solution {
    private static final long MOD = 1_000_000_007L;

    public int sumPrimePowers(int[] primes, int k) {
        PriorityQueue<long[]> heap = new PriorityQueue<>(Comparator.comparingLong(entry -> entry[0]));
        for (int prime : primes) {
            heap.add(new long[] {prime, prime});
        }
        long total = 0;
        for (int step = 0; step < k; step++) {
            long[] entry = heap.poll();
            total = (total + entry[0]) % MOD;
            if (entry[0] <= Long.MAX_VALUE / entry[1]) {
                heap.add(new long[] {entry[0] * entry[1], entry[1]});
            }
        }
        return (int) total;
    }
}
