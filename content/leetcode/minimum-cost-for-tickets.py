class Solution:
    def mincostTickets(self, days, costs):
        travel_days = set(days)
        durations = (1, 7, 30)
        minimum_cost = [0] * 366
        for day in range(1, 366):
            if day not in travel_days:
                minimum_cost[day] = minimum_cost[day - 1]
                continue
            minimum_cost[day] = min(
                minimum_cost[max(0, day - duration)] + cost
                for duration, cost in zip(durations, costs)
            )
        return minimum_cost[-1]
