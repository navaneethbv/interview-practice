class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        Map<Character, Integer> counts = new HashMap<>();
        int left = 0;
        int bestLength = 0;
        for (int right = 0; right < s.length(); right++) {
            char character = s.charAt(right);
            counts.put(character, counts.getOrDefault(character, 0) + 1);
            while (counts.size() > k) {
                char leftCharacter = s.charAt(left++);
                int remaining = counts.get(leftCharacter) - 1;
                if (remaining == 0) {
                    counts.remove(leftCharacter);
                } else {
                    counts.put(leftCharacter, remaining);
                }
            }
            bestLength = Math.max(bestLength, right - left + 1);
        }
        return bestLength;
    }
}
