from collections import defaultdict, deque


class Solution:
    def findAllRecipes(self, recipes, ingredients, supplies):
        waiting = defaultdict(list)
        remaining = [len(parts) for parts in ingredients]
        for i, parts in enumerate(ingredients):
            for name in parts:
                waiting[name].append(i)
        queue = deque(supplies)
        result = []
        while queue:
            name = queue.popleft()
            for i in waiting[name]:
                remaining[i] -= 1
                if remaining[i] == 0:
                    result.append(recipes[i])
                    queue.append(recipes[i])
        return result
