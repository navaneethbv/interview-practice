class Solution {
    public int minDistance(String word1, String word2) {
        int[] previousRow = new int[word2.length() + 1];
        for (int secondIndex = 0; secondIndex <= word2.length(); secondIndex++) {
            previousRow[secondIndex] = secondIndex;
        }

        for (int firstIndex = 1; firstIndex <= word1.length(); firstIndex++) {
            int[] currentRow = new int[word2.length() + 1];
            currentRow[0] = firstIndex;
            for (int secondIndex = 1; secondIndex <= word2.length(); secondIndex++) {
                if (word1.charAt(firstIndex - 1) == word2.charAt(secondIndex - 1)) {
                    currentRow[secondIndex] = previousRow[secondIndex - 1];
                } else {
                    int insertCost = currentRow[secondIndex - 1];
                    int deleteCost = previousRow[secondIndex];
                    int replaceCost = previousRow[secondIndex - 1];
                    currentRow[secondIndex] = 1 + Math.min(
                            insertCost,
                            Math.min(deleteCost, replaceCost)
                    );
                }
            }
            previousRow = currentRow;
        }
        return previousRow[word2.length()];
    }
}
