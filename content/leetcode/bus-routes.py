from collections import defaultdict, deque
class Solution:
    def numBusesToDestination(self, routes, source, target):
        if source == target:
            return 0
        buses_at_stop = defaultdict(list)
        for bus_index, route in enumerate(routes):
            for stop in route:
                buses_at_stop[stop].append(bus_index)
        pending = deque([(source, 0)])
        seen_stops = {source}
        used_buses = set()
        while pending:
            stop, buses_taken = pending.popleft()
            for bus_index in buses_at_stop[stop]:
                if bus_index in used_buses:
                    continue
                used_buses.add(bus_index)
                if self._ride(routes[bus_index], target, seen_stops, pending,
                              buses_taken + 1):
                    return buses_taken + 1
        return -1

    def _ride(self, route, target, seen_stops, pending, buses_taken):
        """Queues unseen stops on this bus; returns True when it reaches the target."""
        for stop in route:
            if stop == target:
                return True
            if stop not in seen_stops:
                seen_stops.add(stop)
                pending.append((stop, buses_taken))
        return False
