class Solution {
    public int minOperations(String s, int k) {
        int length = s.length();
        int zeroCount = 0;
        for (int index = 0; index < length; index++) {
            if (s.charAt(index) == '0') {
                zeroCount++;
            }
        }
        if (zeroCount == 0) {
            return 0;
        }
        for (int moves = 1; moves <= length; moves++) {
            long flipped = (long) moves * k;
            long requiredCapacity = (long) length * moves
                    - (moves % 2 == 0 ? zeroCount : length - zeroCount);
            if (flipped >= zeroCount && (flipped - zeroCount) % 2 == 0
                    && flipped <= requiredCapacity) {
                return moves;
            }
        }
        return -1;
    }
}
