class Solution {
    public List<String> splitWordsBySeparator(List<String> words, char separator) {
        List<String> result = new ArrayList<>();
        for (String word : words) {
            int start = 0;
            for (int i = 0; i <= word.length(); i++) {
                if (i == word.length() || word.charAt(i) == separator) {
                    if (i > start) result.add(word.substring(start, i));
                    start = i + 1;
                }
            }
        }
        return result;
    }
}
