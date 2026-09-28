class Solution {
    public boolean canConstruct(String s, int k) {
        int[] counts = new int[26];
        for (int index = 0; index < s.length(); index++) {
            char character = s.charAt(index);
            counts[character - 'a']++;
        }

        int oddCount = 0;
        for (int count : counts) {
            oddCount += count % 2;
        }
        return oddCount <= k && k <= s.length();
    }
}
