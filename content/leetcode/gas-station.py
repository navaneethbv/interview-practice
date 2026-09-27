class Solution:
    def canCompleteCircuit(self, gas, cost):
        total_balance = 0
        tank_balance = 0
        start_station = 0

        for station, (available, required) in enumerate(zip(gas, cost)):
            balance = available - required
            total_balance += balance
            tank_balance += balance
            if tank_balance < 0:
                start_station = station + 1
                tank_balance = 0

        if total_balance < 0:
            return -1
        return start_station
