class Solution {
    public int maximumPopulation(int[][] logs) {
        int[] changes = new int[101];
        for (int[] log : logs) {
            changes[log[0] - 1950]++;
            changes[log[1] - 1950]--;
        }
        int population = 0;
        int bestPopulation = 0;
        int bestYear = 1950;
        for (int offset = 0; offset < 100; offset++) {
            population += changes[offset];
            if (population > bestPopulation) {
                bestPopulation = population;
                bestYear = 1950 + offset;
            }
        }
        return bestYear;
    }
}
