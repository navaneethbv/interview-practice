class Solution {
    public int shortestDistance(String[] wordsDict, String word1, String word2) {
        int first = -1;
        int second = -1;
        int best = wordsDict.length;
        for (int index = 0; index < wordsDict.length; index++) {
            if (wordsDict[index].equals(word1)) {
                first = index;
            }
            if (wordsDict[index].equals(word2)) {
                second = index;
            }
            if (first >= 0 && second >= 0) {
                best = Math.min(best, Math.abs(first - second));
            }
        }
        return best;
    }
}
