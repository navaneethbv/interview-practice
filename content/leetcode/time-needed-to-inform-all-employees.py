class Solution:

    def numOfMinutes(self, n, headID, manager, informTime):
        children = [[] for _ in range(n)]
        for i, p in enumerate(manager):
            if p >= 0:
                children[p].append(i)
        ans = 0
        stack = [(headID, 0)]
        while stack:
            x, t = stack.pop()
            ans = max(ans, t)
            stack.extend(((y, t + informTime[x]) for y in children[x]))
        return ans
