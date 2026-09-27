class Solution:
    def minCostClimbingStairs(self, cost):
        two_steps_back = 0
        one_step_back = 0

        for step in range(2, len(cost) + 1):
            current = min(
                one_step_back + cost[step - 1],
                two_steps_back + cost[step - 2],
            )
            two_steps_back, one_step_back = one_step_back, current

        return one_step_back
