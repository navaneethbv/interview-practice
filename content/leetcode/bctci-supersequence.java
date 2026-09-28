class Solution {
    public boolean hasSupersequence(String[] arr) {
        boolean[][] edge = new boolean[26][26];
        boolean[] present = new boolean[26];
        for (String word : arr) {
            boolean[] seen = new boolean[26];
            for (int i = 0; i < word.length(); i++) {
                int letter = word.charAt(i) - 'a';
                if (seen[letter]) {
                    return false;
                }
                seen[letter] = true;
                present[letter] = true;
                if (i > 0) {
                    edge[word.charAt(i - 1) - 'a'][letter] = true;
                }
            }
        }
        int[] indegree = new int[26];
        for (int from = 0; from < 26; from++) {
            for (int to = 0; to < 26; to++) {
                if (edge[from][to]) {
                    indegree[to]++;
                }
            }
        }
        Deque<Integer> ready = new ArrayDeque<>();
        int letters = 0;
        for (int letter = 0; letter < 26; letter++) {
            if (present[letter]) {
                letters++;
                if (indegree[letter] == 0) {
                    ready.push(letter);
                }
            }
        }
        int placed = 0;
        while (!ready.isEmpty()) {
            int letter = ready.pop();
            placed++;
            for (int to = 0; to < 26; to++) {
                if (edge[letter][to] && --indegree[to] == 0) {
                    ready.push(to);
                }
            }
        }
        return placed == letters;
    }
}
