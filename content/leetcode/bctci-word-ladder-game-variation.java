class Solution {
    public boolean canReach(String word1, String word2, String[] words) {
        Set<String> valid = new HashSet<>(Arrays.asList(words));
        Set<String> seen = new HashSet<>();
        Deque<String[]> queue = new ArrayDeque<>();
        for (String move : new String[] {"add", "remove"}) {
            seen.add(move + ":" + word1);
            queue.add(new String[] {word1, move});
        }
        while (!queue.isEmpty()) {
            String[] state = queue.poll();
            String word = state[0];
            if (word.equals(word2)) {
                return true;
            }
            String following = state[1].equals("add") ? "remove" : "add";
            for (String candidate : moves(word, state[1], valid)) {
                if (seen.add(following + ":" + candidate)) {
                    queue.add(new String[] {candidate, following});
                }
            }
        }
        return false;
    }

    private List<String> moves(String word, String move, Set<String> valid) {
        List<String> result = new ArrayList<>();
        if (move.equals("remove")) {
            for (int i = 0; i < word.length(); i++) {
                String candidate = word.substring(0, i) + word.substring(i + 1);
                if (valid.contains(candidate)) {
                    result.add(candidate);
                }
            }
            return result;
        }
        for (int i = 0; i <= word.length(); i++) {
            for (char letter = 'a'; letter <= 'z'; letter++) {
                String candidate = word.substring(0, i) + letter + word.substring(i);
                if (valid.contains(candidate)) {
                    result.add(candidate);
                }
            }
        }
        return result;
    }
}
