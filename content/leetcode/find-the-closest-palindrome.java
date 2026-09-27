class Solution {
    public String nearestPalindromic(String n) {
        int length = n.length();
        long value = Long.parseLong(n);
        long prefix = Long.parseLong(n.substring(0, (length + 1) / 2));
        Set<Long> candidates = new HashSet<>();
        candidates.add(powerOfTen(length - 1) - 1);
        candidates.add(powerOfTen(length) + 1);
        for (long candidatePrefix = prefix - 1; candidatePrefix <= prefix + 1; candidatePrefix++) {
            if (candidatePrefix >= 0) {
                candidates.add(makePalindrome(candidatePrefix, length));
            }
        }
        candidates.remove(value);

        long best = -1;
        for (long candidate : candidates) {
            if (best == -1 || Math.abs(candidate - value) < Math.abs(best - value)
                    || (Math.abs(candidate - value) == Math.abs(best - value) && candidate < best)) {
                best = candidate;
            }
        }
        return Long.toString(best);
    }

    private long powerOfTen(int exponent) {
        long result = 1;
        for (int index = 0; index < exponent; index++) {
            result *= 10;
        }
        return result;
    }

    private long makePalindrome(long prefix, int length) {
        String left = Long.toString(prefix);
        int mirroredLength = Math.min(length / 2, left.length());
        String right = new StringBuilder(left.substring(0, mirroredLength)).reverse().toString();
        return Long.parseLong(left + right);
    }
}
