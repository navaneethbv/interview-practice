class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] availableLetters = new int[26];
        for (int characterIndex = 0; characterIndex < magazine.length(); characterIndex++) {
            char character = magazine.charAt(characterIndex);
            availableLetters[character - 'a']++;
        }
        for (int characterIndex = 0; characterIndex < ransomNote.length(); characterIndex++) {
            char character = ransomNote.charAt(characterIndex);
            availableLetters[character - 'a']--;
            if (availableLetters[character - 'a'] < 0) {
                return false;
            }
        }
        return true;
    }
}
