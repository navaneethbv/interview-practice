class Solution {
    public int countPrimes(int n) {
        boolean[] composite = new boolean[n];
        int primeCount = 0;

        for (int candidate = 2; candidate < n; candidate++) {
            if (!composite[candidate]) {
                primeCount++;
                if ((long) candidate * candidate < n) {
                    for (int multiple = candidate * candidate;
                            multiple < n;
                            multiple += candidate) {
                        composite[multiple] = true;
                    }
                }
            }
        }
        return primeCount;
    }
}
