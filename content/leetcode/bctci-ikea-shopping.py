class Solution:
    def bestItems(self, budget, prices, ratings):
        best = [-1.0, []]

        def choose(index, remaining, rating, picked):
            if index == len(prices):
                if rating > best[0]:
                    best[0], best[1] = rating, list(picked)
                return
            choose(index + 1, remaining, rating, picked)
            if prices[index] <= remaining:
                picked.append(index)
                choose(index + 1, remaining - prices[index], rating + ratings[index], picked)
                picked.pop()

        choose(0, budget, 0.0, [])
        return best[1]
