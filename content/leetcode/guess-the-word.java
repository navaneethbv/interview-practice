class Solution {
    public void findSecretWord(String[] words, Master master) {
        List<String> candidates = new ArrayList<>(Arrays.asList(words));
        for (int attempt = 0; attempt < 10 && !candidates.isEmpty(); attempt++) {
            String guess = chooseGuess(candidates);
            int matches = master.guess(guess);
            if (matches == 6) {
                return;
            }
            List<String> nextCandidates = new ArrayList<>();
            for (String candidate : candidates) {
                if (countMatches(guess, candidate) == matches) {
                    nextCandidates.add(candidate);
                }
            }
            candidates = nextCandidates;
        }
    }

    private String chooseGuess(List<String> candidates) {
        String bestGuess = candidates.get(0);
        int smallestWorstGroup = candidates.size();
        for (String guess : candidates) {
            int[] groups = new int[7];
            for (String candidate : candidates) {
                groups[countMatches(guess, candidate)]++;
            }
            int worstGroup = 0;
            for (int groupSize : groups) {
                worstGroup = Math.max(worstGroup, groupSize);
            }
            if (worstGroup < smallestWorstGroup) {
                smallestWorstGroup = worstGroup;
                bestGuess = guess;
            }
        }
        return bestGuess;
    }

    private int countMatches(String first, String second) {
        int matches = 0;
        for (int index = 0; index < first.length(); index++) {
            if (first.charAt(index) == second.charAt(index)) {
                matches++;
            }
        }
        return matches;
    }
}
