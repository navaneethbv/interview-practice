class Solution {
    public boolean checkInclusion(String s1, String s2) {
        int[] wanted = new int[26];
        int[] window = new int[26];
        for (char character : s1.toCharArray()) {
            wanted[character - 'a']++;
        }
        for (int index = 0; index < s2.length(); index++) {
            window[s2.charAt(index) - 'a']++;
            if (index >= s1.length()) {
                window[s2.charAt(index - s1.length()) - 'a']--;
            }
            if (Arrays.equals(window, wanted)) {
                return true;
            }
        }
        return false;
    }
}
