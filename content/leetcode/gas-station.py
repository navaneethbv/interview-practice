class Solution:
    def canCompleteCircuit(self, gas, cost):
        total = tank = start = 0
        for i,(available,required) in enumerate(zip(gas,cost)):
            total += available-required
            tank += available-required
            if tank < 0:
                start = i+1
                tank = 0
        return start if total >= 0 else -1
