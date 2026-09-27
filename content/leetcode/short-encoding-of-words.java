class Solution {
    public int minimumLengthEncoding(String[] words) {
        Set<String> remainingWords = new HashSet<>(Arrays.asList(words));
        for (String word : words) {
            for (int suffixStart = 1; suffixStart < word.length(); suffixStart++) {
                remainingWords.remove(word.substring(suffixStart));
            }
        }
        int totalLength = 0;
        for (String word : remainingWords) {
            totalLength += word.length() + 1;
        }
        return totalLength;
    }
}
