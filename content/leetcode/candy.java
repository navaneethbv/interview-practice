class Solution {
    public int candy(int[] ratings) {
        int[] candies = new int[ratings.length];
        Arrays.fill(candies, 1);
        for (int index = 1; index < ratings.length; index++) {
            if (ratings[index] > ratings[index - 1]) {
                candies[index] = candies[index - 1] + 1;
            }
        }
        for (int index = ratings.length - 2; index >= 0; index--) {
            if (ratings[index] > ratings[index + 1]) {
                candies[index] = Math.max(candies[index], candies[index + 1] + 1);
            }
        }
        int totalCandies = 0;
        for (int candyCount : candies) {
            totalCandies += candyCount;
        }
        return totalCandies;
    }
}
