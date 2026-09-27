from collections import defaultdict,deque
class Solution:
    def numBusesToDestination(self, routes, source, target):
        if source==target:return 0
        buses=defaultdict(list)
        for i,route in enumerate(routes):
            for stop in route:buses[stop].append(i)
        q=deque([(source,0)]);seen_stops={source};seen_buses=set()
        while q:
            stop,count=q.popleft()
            for bus in buses[stop]:
                if bus in seen_buses:continue
                seen_buses.add(bus)
                for next_stop in routes[bus]:
                    if next_stop==target:return count+1
                    if next_stop not in seen_stops:seen_stops.add(next_stop);q.append((next_stop,count+1))
        return -1
