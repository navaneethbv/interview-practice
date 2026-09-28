class Solution {
    public boolean canPermutePalindrome(String s) {
        int[] counts = new int[128];
        for (char letter : s.toCharArray()) {
            counts[letter]++;
        }
        int oddCounts = 0;
        for (int count : counts) {
            if (count % 2 == 1) {
                oddCounts++;
            }
        }
        return oddCounts <= 1;
    }
}
