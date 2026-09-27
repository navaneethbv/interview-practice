class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int twoStepsBack = 0;
        int oneStepBack = 0;

        for (int step = 2; step <= cost.length; step++) {
            int current = Math.min(
                    oneStepBack + cost[step - 1],
                    twoStepsBack + cost[step - 2]);
            twoStepsBack = oneStepBack;
            oneStepBack = current;
        }

        return oneStepBack;
    }
}
