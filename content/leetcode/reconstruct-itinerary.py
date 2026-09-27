from collections import defaultdict


class Solution:
    def findItinerary(self, tickets):
        graph = defaultdict(list)
        for source, destination in sorted(tickets, reverse=True):
            graph[source].append(destination)

        stack = ['JFK']
        route = []
        while stack:
            airport = stack[-1]
            if graph[airport]:
                stack.append(graph[airport].pop())
            else:
                route.append(stack.pop())

        return route[::-1]
