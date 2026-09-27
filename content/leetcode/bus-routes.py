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
                if self._ride(routes[bus],target,seen_stops,q,count+1):return count+1
        return -1

    def _ride(self, route, target, seen_stops, q, count):
        """Queues unseen stops on this bus; returns True when it reaches the target."""
        for next_stop in route:
            if next_stop==target:return True
            if next_stop not in seen_stops:seen_stops.add(next_stop);q.append((next_stop,count))
        return False
