class Solution {
    public String replaceWords(List<String> dictionary, String sentence) {
        Set<String> roots = new HashSet<>(dictionary);
        String[] words = sentence.split(" ");
        StringBuilder result = new StringBuilder();
        for (int index = 0; index < words.length; index++) {
            if (index > 0) {
                result.append(' ');
            }
            result.append(shortestRoot(words[index], roots));
        }
        return result.toString();
    }

    private String shortestRoot(String word, Set<String> roots) {
        for (int length = 1; length <= word.length(); length++) {
            String prefix = word.substring(0, length);
            if (roots.contains(prefix)) {
                return prefix;
            }
        }
        return word;
    }
}
