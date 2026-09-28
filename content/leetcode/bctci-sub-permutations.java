class Solution {
    public int solve(String s1, String s2) {
        int[] need = new int[26];
        int[] window = new int[26];
        for (char letter : s1.toCharArray()) {
            need[letter - 'a']++;
        }
        Set<String> found = new HashSet<>();
        int width = s1.length();
        for (int index = 0; index < s2.length(); index++) {
            window[s2.charAt(index) - 'a']++;
            if (index >= width) {
                window[s2.charAt(index - width) - 'a']--;
            }
            if (index + 1 >= width && Arrays.equals(window, need)) {
                found.add(s2.substring(index + 1 - width, index + 1));
            }
        }
        return found.size();
    }
}
