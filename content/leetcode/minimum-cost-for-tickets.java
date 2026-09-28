class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        boolean[] travelDays = new boolean[366];
        for (int day : days) {
            travelDays[day] = true;
        }

        int[] durations = {1, 7, 30};
        int[] minimumCost = new int[366];
        for (int day = 1; day <= 365; day++) {
            minimumCost[day] = minimumCost[day - 1];
            if (!travelDays[day]) {
                continue;
            }
            minimumCost[day] = Integer.MAX_VALUE;
            for (int option = 0; option < durations.length; option++) {
                int coveredThrough = Math.max(0, day - durations[option]);
                minimumCost[day] = Math.min(minimumCost[day], minimumCost[coveredThrough] + costs[option]);
            }
        }
        return minimumCost[365];
    }
}
