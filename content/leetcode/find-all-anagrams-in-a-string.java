class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int[] targetCounts = new int[26];
        int[] windowCounts = new int[26];
        for (int index = 0; index < p.length(); index++) {
            targetCounts[p.charAt(index) - 'a']++;
        }

        List<Integer> matches = new ArrayList<>();
        for (int index = 0; index < s.length(); index++) {
            windowCounts[s.charAt(index) - 'a']++;
            if (index >= p.length()) {
                windowCounts[s.charAt(index - p.length()) - 'a']--;
            }
            if (Arrays.equals(targetCounts, windowCounts)) {
                matches.add(index - p.length() + 1);
            }
        }
        return matches;
    }
}
