class Solution {
    public String compressedString(String word) {
        StringBuilder compressed = new StringBuilder();
        int start = 0;
        while (start < word.length()) {
            int end = start;
            while (end < word.length()
                    && word.charAt(end) == word.charAt(start)
                    && end - start < 9) {
                end++;
            }
            compressed.append(end - start);
            compressed.append(word.charAt(start));
            start = end;
        }
        return compressed.toString();
    }
}
