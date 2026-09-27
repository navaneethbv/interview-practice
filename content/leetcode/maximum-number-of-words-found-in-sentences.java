class Solution {
    public int mostWordsFound(String[] sentences) {
        int maximum = 0;
        for (String sentence : sentences) {
            int wordCount = 1;
            for (int index = 0; index < sentence.length(); index++) {
                char character = sentence.charAt(index);
                if (character == ' ') {
                    wordCount++;
                }
            }
            maximum = Math.max(maximum, wordCount);
        }
        return maximum;
    }
}
