class Solution {
    public int characterReplacement(String s, int k) {
        int[] counts = new int[26];
        int left = 0;
        int best = 0;
        int peak = 0;
        for (int right = 0; right < s.length(); right++) {
            int character = s.charAt(right) - 'A';
            counts[character]++;
            peak = Math.max(peak, counts[character]);
            while (right - left + 1 - peak > k) {
                counts[s.charAt(left) - 'A']--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
