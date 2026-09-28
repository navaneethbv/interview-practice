class Solution {
    public int numOfWays(int n) {
        long twoColorRows = 6;
        long threeColorRows = 6;
        long modulus = 1000000007;
        for (int row = 1; row < n; row++) {
            long nextTwo = (3 * twoColorRows + 2 * threeColorRows) % modulus;
            long nextThree = (2 * twoColorRows + 2 * threeColorRows) % modulus;
            twoColorRows = nextTwo;
            threeColorRows = nextThree;
        }
        return (int) ((twoColorRows + threeColorRows) % modulus);
    }
}
