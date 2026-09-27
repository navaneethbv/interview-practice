class Solution:
    def findCircleNum(self, isConnected):
        city_count = len(isConnected)
        seen = set()
        provinces = 0

        for city in range(city_count):
            if city in seen:
                continue
            provinces += 1
            stack = [city]
            seen.add(city)
            while stack:
                current = stack.pop()
                for neighbor, connected in enumerate(isConnected[current]):
                    if connected and neighbor not in seen:
                        seen.add(neighbor)
                        stack.append(neighbor)

        return provinces
