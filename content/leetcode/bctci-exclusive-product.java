class Solution {
    private static final long MOD = 1_000_000_007L;

    public int[] exclusiveProduct(int[] arr) {
        int n = arr.length;
        long[] result = new long[n];
        long prefix = 1;
        for (int i = 0; i < n; i++) {
            result[i] = prefix;
            prefix = prefix * arr[i] % MOD;
        }
        long suffix = 1;
        int[] answer = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            answer[i] = (int) (result[i] * suffix % MOD);
            suffix = suffix * arr[i] % MOD;
        }
        return answer;
    }
}
