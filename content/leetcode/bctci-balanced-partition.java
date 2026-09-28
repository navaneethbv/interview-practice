class Solution {
    public int maxBalancedPieces(String s) {
        int depth = 0;
        int pieces = 0;
        for (char character : s.toCharArray()) {
            depth += character == '(' ? 1 : -1;
            if (depth == 0) {
                pieces++;
            }
        }
        return pieces;
    }
}
