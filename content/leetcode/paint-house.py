class Solution:
    def minCost(self, costs):
        best_cost = [0, 0, 0]
        for row in costs:
            next_cost = [0, 0, 0]
            for color in range(3):
                other_cost = min(best_cost[other] for other in range(3) if other != color)
                next_cost[color] = row[color] + other_cost
            best_cost = next_cost
        return min(best_cost)
