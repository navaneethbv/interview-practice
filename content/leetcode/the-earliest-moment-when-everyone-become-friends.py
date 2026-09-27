class Solution:
    def earliestAcq(self, logs, n):
        parent = list(range(n))
        component_size = [1] * n

        def find(x):
            while x != parent[x]:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        components = n
        for time, first, second in sorted(logs):
            first_root = find(first)
            second_root = find(second)
            if first_root != second_root:
                if component_size[first_root] < component_size[second_root]:
                    first_root, second_root = second_root, first_root
                parent[second_root] = first_root
                component_size[first_root] += component_size[second_root]
                components -= 1
                if components == 1:
                    return time
        return -1
