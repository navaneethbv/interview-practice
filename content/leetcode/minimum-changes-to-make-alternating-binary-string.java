class Solution {
    public int minOperations(String s) {
        int mismatches = 0;
        for (int index = 0; index < s.length(); index++) {
            int expected = index % 2;
            if (s.charAt(index) - '0' != expected) {
                mismatches++;
            }
        }
        return Math.min(mismatches, s.length() - mismatches);
    }
}
