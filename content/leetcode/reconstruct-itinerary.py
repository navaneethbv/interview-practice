from collections import defaultdict
class Solution:
    def findItinerary(self, tickets):
        graph = defaultdict(list)
        for a,b in sorted(tickets, reverse=True):
            graph[a].append(b)
        stack, route = ['JFK'], []
        while stack:
            if graph[stack[-1]]:
                stack.append(graph[stack[-1]].pop())
            else:
                route.append(stack.pop())
        return route[::-1]
