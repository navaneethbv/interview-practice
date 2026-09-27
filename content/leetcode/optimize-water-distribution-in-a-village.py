class Solution:
    def minCostToSupplyWater(self, n, wells, pipes):
        parent = list(range(n + 1))
        size = [1] * (n + 1)

        def find(house):
            while parent[house] != house:
                parent[house] = parent[parent[house]]
                house = parent[house]
            return house

        edges = [(cost, 0, house + 1) for house, cost in enumerate(wells)]
        edges.extend((cost, first, second) for first, second, cost in pipes)
        edges.sort()
        total = 0
        for cost, first, second in edges:
            first_root = find(first)
            second_root = find(second)
            if first_root == second_root:
                continue
            if size[first_root] < size[second_root]:
                first_root, second_root = second_root, first_root
            parent[second_root] = first_root
            size[first_root] += size[second_root]
            total += cost
        return total
