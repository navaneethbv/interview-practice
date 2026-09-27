class Solution {
    public List<List<Integer>> findRLEArray(int[][] encoded1, int[][] encoded2) {
        List<List<Integer>> productRuns = new ArrayList<>();
        int firstIndex = 0;
        int secondIndex = 0;
        int firstRemaining = encoded1[0][1];
        int secondRemaining = encoded2[0][1];

        while (firstIndex < encoded1.length) {
            int runLength = Math.min(firstRemaining, secondRemaining);
            int product = encoded1[firstIndex][0] * encoded2[secondIndex][0];

            if (!productRuns.isEmpty()
                    && productRuns.get(productRuns.size() - 1).get(0) == product) {
                List<Integer> lastRun = productRuns.get(productRuns.size() - 1);
                lastRun.set(1, lastRun.get(1) + runLength);
            } else {
                productRuns.add(new ArrayList<>(Arrays.asList(product, runLength)));
            }

            firstRemaining -= runLength;
            secondRemaining -= runLength;
            if (firstRemaining == 0) {
                firstIndex++;
                if (firstIndex < encoded1.length) {
                    firstRemaining = encoded1[firstIndex][1];
                }
            }
            if (secondRemaining == 0) {
                secondIndex++;
                if (secondIndex < encoded2.length) {
                    secondRemaining = encoded2[secondIndex][1];
                }
            }
        }
        return productRuns;
    }
}
