class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            char character = s.charAt(right);
            left = Math.max(left, last.getOrDefault(character, -1) + 1);
            last.put(character, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
