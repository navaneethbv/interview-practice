class Solution {
    public boolean areSentencesSimilarTwo(String[] sentence1, String[] sentence2,
                                          List<List<String>> similarPairs) {
        Map<String, String> parent = new HashMap<>();
        Map<String, Integer> size = new HashMap<>();
        for (List<String> pair : similarPairs) {
            union(parent, size, pair.get(0), pair.get(1));
        }
        if (sentence1.length != sentence2.length) {
            return false;
        }
        for (int index = 0; index < sentence1.length; index++) {
            if (!find(parent, size, sentence1[index]).equals(find(parent, size, sentence2[index]))) {
                return false;
            }
        }
        return true;
    }

    private void union(Map<String, String> parent, Map<String, Integer> size,
                       String first, String second) {
        String firstRoot = find(parent, size, first);
        String secondRoot = find(parent, size, second);
        if (firstRoot.equals(secondRoot)) {
            return;
        }
        if (size.get(firstRoot) < size.get(secondRoot)) {
            String temporary = firstRoot;
            firstRoot = secondRoot;
            secondRoot = temporary;
        }
        parent.put(secondRoot, firstRoot);
        size.put(firstRoot, size.get(firstRoot) + size.get(secondRoot));
    }

    private String find(Map<String, String> parent, Map<String, Integer> size, String word) {
        parent.putIfAbsent(word, word);
        size.putIfAbsent(word, 1);
        String root = word;
        while (!parent.get(root).equals(root)) {
            root = parent.get(root);
        }
        while (!parent.get(word).equals(word)) {
            String next = parent.get(word);
            parent.put(word, root);
            word = next;
        }
        return root;
    }
}
