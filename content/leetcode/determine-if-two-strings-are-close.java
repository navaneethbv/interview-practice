class Solution {
    public boolean closeStrings(String word1, String word2) {
        int[] firstCounts = frequencies(word1);
        int[] secondCounts = frequencies(word2);
        for (int letter = 0; letter < 26; letter++) {
            if ((firstCounts[letter] == 0) != (secondCounts[letter] == 0)) {
                return false;
            }
        }
        Arrays.sort(firstCounts);
        Arrays.sort(secondCounts);
        return Arrays.equals(firstCounts, secondCounts);
    }

    private int[] frequencies(String word) {
        int[] counts = new int[26];
        for (int index = 0; index < word.length(); index++) {
            counts[word.charAt(index) - 'a']++;
        }
        return counts;
    }
}
