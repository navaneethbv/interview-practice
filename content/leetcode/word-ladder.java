class Solution {
    public int ladderLength(
            String beginWord,
            String endWord,
            List<String> wordList) {
        Set<String> remainingWords = new HashSet<>(wordList);
        if (!remainingWords.contains(endWord)) {
            return 0;
        }

        remainingWords.remove(beginWord);
        Deque<String> queue = new ArrayDeque<>();
        queue.add(beginWord);
        int distance = 1;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int count = 0; count < levelSize; count++) {
                char[] letters = queue.remove().toCharArray();
                for (int index = 0; index < letters.length; index++) {
                    char original = letters[index];
                    for (char replacement = 'a'; replacement <= 'z'; replacement++) {
                        letters[index] = replacement;
                        String candidate = new String(letters);
                        if (!remainingWords.remove(candidate)) {
                            continue;
                        }
                        if (candidate.equals(endWord)) {
                            return distance + 1;
                        }
                        queue.add(candidate);
                    }
                    letters[index] = original;
                }
            }
            distance++;
        }

        return 0;
    }
}
