class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int score = 0;
        for (int index = 0; index < k; index++) {
            score += cardPoints[index];
        }
        int best = score;
        for (int takenRight = 1; takenRight <= k; takenRight++) {
            score += cardPoints[cardPoints.length - takenRight]
                    - cardPoints[k - takenRight];
            best = Math.max(best, score);
        }
        return best;
    }
}
