class Solution {
    public int countBinarySubstrings(String s) {
        int previousRunLength = 0;
        int currentRunLength = 1;
        int total = 0;
        for (int index = 1; index < s.length(); index++) {
            if (s.charAt(index) == s.charAt(index - 1)) {
                currentRunLength++;
            } else {
                total += Math.min(previousRunLength, currentRunLength);
                previousRunLength = currentRunLength;
                currentRunLength = 1;
            }
        }
        return total + Math.min(previousRunLength, currentRunLength);
    }
}
