class Solution {
    private String expression;
    private long[][][] memo;

    public int countEval(String expression, boolean result) {
        this.expression = expression;
        int n = expression.length();
        memo = new long[n][n][];
        long[] counts = ways(0, n - 1);
        return (int) (result ? counts[0] : counts[1]);
    }

    private long[] ways(int start, int end) {
        if (memo[start][end] != null) {
            return memo[start][end];
        }
        long trueCount = 0;
        long falseCount = 0;
        if (start == end) {
            boolean value = expression.charAt(start) == '1';
            trueCount = value ? 1 : 0;
            falseCount = value ? 0 : 1;
        }
        for (int split = start + 1; split < end; split += 2) {
            long[] left = ways(start, split - 1);
            long[] right = ways(split + 1, end);
            long total = (left[0] + left[1]) * (right[0] + right[1]);
            long producedTrue = producedTrue(expression.charAt(split), left, right, total);
            trueCount += producedTrue;
            falseCount += total - producedTrue;
        }
        memo[start][end] = new long[] {trueCount, falseCount};
        return memo[start][end];
    }

    private long producedTrue(char operator, long[] left, long[] right, long total) {
        if (operator == '&') {
            return left[0] * right[0];
        }
        if (operator == '|') {
            return total - left[1] * right[1];
        }
        return left[0] * right[1] + left[1] * right[0];
    }
}
