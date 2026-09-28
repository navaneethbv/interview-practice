class Solution {
    public int minimumDeletions(String s) {
        int seenB = 0;
        int deletions = 0;
        for (int index = 0; index < s.length(); index++) {
            if (s.charAt(index) == 'b') {
                seenB++;
            } else {
                deletions = Math.min(deletions + 1, seenB);
            }
        }
        return deletions;
    }
}
