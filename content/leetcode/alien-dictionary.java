class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> edges = new TreeMap<>();
        Map<Character, Integer> degree = new TreeMap<>();
        registerLetters(words, edges, degree);
        for (int index = 1; index < words.length; index++) {
            if (!addRelation(words[index - 1], words[index], edges, degree)) {
                return "";
            }
        }
        return topologicalOrder(edges, degree);
    }

    private void registerLetters(String[] words, Map<Character, Set<Character>> edges,
                                 Map<Character, Integer> degree) {
        for (String word : words) {
            for (int index = 0; index < word.length(); index++) {
                char letter = word.charAt(index);
                edges.putIfAbsent(letter, new TreeSet<>());
                degree.putIfAbsent(letter, 0);
            }
        }
    }

    private boolean addRelation(String first, String second, Map<Character, Set<Character>> edges,
                                Map<Character, Integer> degree) {
        int shared = Math.min(first.length(), second.length());
        for (int index = 0; index < shared; index++) {
            char before = first.charAt(index);
            char after = second.charAt(index);
            if (before != after) {
                if (edges.get(before).add(after)) {
                    degree.put(after, degree.get(after) + 1);
                }
                return true;
            }
        }
        return first.length() <= second.length();
    }

    private String topologicalOrder(Map<Character, Set<Character>> edges, Map<Character, Integer> degree) {
        Deque<Character> queue = new ArrayDeque<>();
        for (char letter : degree.keySet()) {
            if (degree.get(letter) == 0) {
                queue.addLast(letter);
            }
        }
        StringBuilder result = new StringBuilder();
        while (!queue.isEmpty()) {
            char letter = queue.removeFirst();
            result.append(letter);
            for (char dependent : edges.get(letter)) {
                degree.put(dependent, degree.get(dependent) - 1);
                if (degree.get(dependent) == 0) {
                    queue.addLast(dependent);
                }
            }
        }
        return result.length() == degree.size() ? result.toString() : "";
    }
}
