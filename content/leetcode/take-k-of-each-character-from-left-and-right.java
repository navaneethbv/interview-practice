class Solution {
    public int takeCharacters(String s, int k) {
        int[] remaining = new int[3];
        for (int index = 0; index < s.length(); index++) {
            remaining[s.charAt(index) - 'a']++;
        }
        for (int count : remaining) {
            if (count < k) {
                return -1;
            }
        }
        int left = 0;
        int longestMiddle = 0;
        for (int right = 0; right < s.length(); right++) {
            int character = s.charAt(right) - 'a';
            remaining[character]--;
            while (remaining[character] < k) {
                remaining[s.charAt(left) - 'a']++;
                left++;
            }
            longestMiddle = Math.max(longestMiddle, right - left + 1);
        }
        return s.length() - longestMiddle;
    }
}
