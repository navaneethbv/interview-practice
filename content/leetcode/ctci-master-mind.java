class Solution {
    public int[] estimate(String solution, String guess) {
        int hits = 0;
        Map<Character, Integer> unmatched = new HashMap<>();
        for (int i = 0; i < solution.length(); i++) {
            if (solution.charAt(i) == guess.charAt(i)) {
                hits++;
            } else {
                unmatched.merge(solution.charAt(i), 1, Integer::sum);
            }
        }
        int pseudoHits = 0;
        for (int i = 0; i < solution.length(); i++) {
            char guessed = guess.charAt(i);
            if (solution.charAt(i) != guessed && unmatched.getOrDefault(guessed, 0) > 0) {
                unmatched.merge(guessed, -1, Integer::sum);
                pseudoHits++;
            }
        }
        return new int[] {hits, pseudoHits};
    }
}
