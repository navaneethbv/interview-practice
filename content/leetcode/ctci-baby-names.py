class Solution:
    def trulyMostPopular(self, names, counts, synonyms):
        parent = {}

        def find(name):
            parent.setdefault(name, name)
            while parent[name] != name:
                parent[name] = parent[parent[name]]
                name = parent[name]
            return name

        for first, second in synonyms:
            root_first, root_second = find(first), find(second)
            if root_first != root_second:
                smaller, larger = sorted((root_first, root_second))
                parent[larger] = smaller
        totals = {}
        for name, count in zip(names, counts):
            root = find(name)
            totals[root] = totals.get(root, 0) + count
        return [f"{root}:{total}" for root, total in totals.items()]
