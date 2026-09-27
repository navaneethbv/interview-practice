class Solution {
    public int firstUniqChar(String s) {
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); index++) {
            counts[s.charAt(index) - 'a']++;
        }
        for (int index = 0; index < s.length(); index++) {
            if (counts[s.charAt(index) - 'a'] == 1) {
                return index;
            }
        }
        return -1;
    }
}
