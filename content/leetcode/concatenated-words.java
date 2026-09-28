class Solution {
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        Set<String> available = new HashSet<>(Arrays.asList(words));
        List<String> concatenated = new ArrayList<>();
        for (String word : words) {
            boolean[] possible = new boolean[word.length() + 1];
            possible[0] = true;
            for (int end = 1; end <= word.length(); end++) {
                for (int start = 0; start < end; start++) {
                    boolean canUseWord = start > 0 || end < word.length();
                    if (possible[start] && canUseWord && available.contains(word.substring(start, end))) {
                        possible[end] = true;
                        break;
                    }
                }
            }
            if (possible[word.length()]) {
                concatenated.add(word);
            }
        }
        return concatenated;
    }
}
