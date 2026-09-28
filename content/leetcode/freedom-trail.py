from collections import defaultdict
class Solution:
    def findRotateSteps(self, ring, key):
        positions = defaultdict(list)
        for index, character in enumerate(ring):
            positions[character].append(index)

        costs = {0: 0}
        ring_length = len(ring)
        for character in key:
            next_costs = {}
            for next_position in positions[character]:
                best = min(
                    cost
                    + min(
                        abs(previous_position - next_position),
                        ring_length - abs(previous_position - next_position),
                    )
                    + 1
                    for previous_position, cost in costs.items()
                )
                next_costs[next_position] = best
            costs = next_costs
        return min(costs.values())
