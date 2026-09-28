class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        return sentences(s, 0, new HashSet<>(wordDict), new HashMap<>());
    }

    private List<String> sentences(String s, int start, Set<String> words,
                                   Map<Integer, List<String>> memo) {
        if (memo.containsKey(start)) {
            return memo.get(start);
        }
        List<String> result = new ArrayList<>();
        if (start == s.length()) {
            result.add("");
        }
        for (int end = start + 1; end <= s.length(); end++) {
            String word = s.substring(start, end);
            if (!words.contains(word)) {
                continue;
            }
            for (String rest : sentences(s, end, words, memo)) {
                result.add(word + (rest.isEmpty() ? "" : " " + rest));
            }
        }
        memo.put(start, result);
        return result;
    }
}
