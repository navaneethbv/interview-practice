class Solution {
    public List<String> sortByFrequency(String word) {
        int[] counts = new int[26];
        for (char letter : word.toCharArray()) {
            counts[letter - 'a']++;
        }
        List<String> letters = new ArrayList<>();
        for (char letter = 'a'; letter <= 'z'; letter++) {
            if (counts[letter - 'a'] > 0) {
                letters.add(String.valueOf(letter));
            }
        }
        letters.sort((x, y) -> counts[y.charAt(0) - 'a'] - counts[x.charAt(0) - 'a']);
        return letters;
    }
}
