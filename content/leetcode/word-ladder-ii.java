class Solution {
    public List<List<String>> findLadders(
            String beginWord, String endWord, List<String> wordList) {
        Set<String> remainingWords = new HashSet<>(wordList);
        List<List<String>> paths = new ArrayList<>();
        if (!remainingWords.contains(endWord)) {
            return paths;
        }

        Set<String> currentLevel = new HashSet<>();
        currentLevel.add(beginWord);
        remainingWords.remove(beginWord);
        Map<String, List<String>> parents = new HashMap<>();

        while (!currentLevel.isEmpty() && !currentLevel.contains(endWord)) {
            Set<String> nextLevel = new HashSet<>();
            for (String word : currentLevel) {
                addNeighbors(word, remainingWords, nextLevel, parents);
            }
            remainingWords.removeAll(nextLevel);
            currentLevel = nextLevel;
        }

        if (currentLevel.contains(endWord)) {
            buildPaths(endWord, beginWord, parents, new ArrayList<>(), paths);
        }
        return paths;
    }

    private void addNeighbors(
            String word,
            Set<String> remainingWords,
            Set<String> nextLevel,
            Map<String, List<String>> parents) {
        char[] characters = word.toCharArray();
        for (int position = 0; position < characters.length; position++) {
            char original = characters[position];
            for (char letter = 'a'; letter <= 'z'; letter++) {
                characters[position] = letter;
                String candidate = new String(characters);
                if (remainingWords.contains(candidate)) {
                    parents.computeIfAbsent(candidate, key -> new ArrayList<>()).add(word);
                    nextLevel.add(candidate);
                }
            }
            characters[position] = original;
        }
    }

    private void buildPaths(
            String word,
            String beginWord,
            Map<String, List<String>> parents,
            List<String> reversedPath,
            List<List<String>> paths) {
        reversedPath.add(word);
        if (word.equals(beginWord)) {
            List<String> path = new ArrayList<>(reversedPath);
            Collections.reverse(path);
            paths.add(path);
        } else {
            for (String parent : parents.getOrDefault(word, Collections.emptyList())) {
                buildPaths(parent, beginWord, parents, reversedPath, paths);
            }
        }
        reversedPath.remove(reversedPath.size() - 1);
    }
}
