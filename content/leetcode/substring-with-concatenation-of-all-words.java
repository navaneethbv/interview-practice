class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        int wordLength = words[0].length();
        int wordCount = words.length;
        Map<String, Integer> required = new HashMap<>();
        for (String word : words) {
            required.put(word, required.getOrDefault(word, 0) + 1);
        }
        List<Integer> result = new ArrayList<>();
        for (int offset = 0; offset < wordLength; offset++) {
            scanOffset(s, wordLength, wordCount, offset, required, result);
        }
        return result;
    }

    private void scanOffset(String s, int wordLength, int wordCount, int offset,
            Map<String, Integer> required, List<Integer> result) {
        Map<String, Integer> window = new HashMap<>();
        int left = offset;
        int used = 0;
        for (int right = offset; right + wordLength <= s.length(); right += wordLength) {
            String word = s.substring(right, right + wordLength);
            if (!required.containsKey(word)) {
                window.clear();
                used = 0;
                left = right + wordLength;
                continue;
            }
            window.put(word, window.getOrDefault(word, 0) + 1);
            used++;
            while (window.get(word) > required.get(word)) {
                String removed = s.substring(left, left + wordLength);
                window.put(removed, window.get(removed) - 1);
                left += wordLength;
                used--;
            }
            if (used == wordCount) {
                result.add(left);
            }
        }
    }
}
