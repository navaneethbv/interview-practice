class Solution {
    public int maxVowels(String s, int k) {
        String vowels = "aeiou";
        int count = 0;
        int best = 0;
        for (int index = 0; index < s.length(); index++) {
            if (vowels.indexOf(s.charAt(index)) >= 0) {
                count++;
            }
            if (index >= k && vowels.indexOf(s.charAt(index - k)) >= 0) {
                count--;
            }
            if (index >= k - 1) {
                best = Math.max(best, count);
            }
        }
        return best;
    }
}
