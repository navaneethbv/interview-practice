class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalBalance = 0;
        int tankBalance = 0;
        int startStation = 0;

        for (int station = 0; station < gas.length; station++) {
            int balance = gas[station] - cost[station];
            totalBalance += balance;
            tankBalance += balance;
            if (tankBalance < 0) {
                tankBalance = 0;
                startStation = station + 1;
            }
        }
        return totalBalance >= 0 ? startStation : -1;
    }
}
