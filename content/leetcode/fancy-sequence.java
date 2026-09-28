class Fancy {
    private static final long MOD = 1_000_000_007L;
    private final List<Long> values = new ArrayList<>();
    private long multiplier = 1;
    private long increment = 0;

    public Fancy() {
    }

    private long power(long value, long exponent) {
        long result = 1;
        while (exponent > 0) {
            if ((exponent & 1) != 0) {
                result = result * value % MOD;
            }
            value = value * value % MOD;
            exponent >>= 1;
        }
        return result;
    }

    public void append(int value) {
        long normalized = (value - increment + MOD) % MOD;
        normalized = normalized * power(multiplier, MOD - 2) % MOD;
        values.add(normalized);
    }

    public void addAll(int value) {
        increment = (increment + value) % MOD;
    }

    public void multAll(int value) {
        multiplier = multiplier * value % MOD;
        increment = increment * value % MOD;
    }

    public int getIndex(int index) {
        if (index >= values.size()) {
            return -1;
        }
        return (int) ((values.get(index) * multiplier + increment) % MOD);
    }
}
