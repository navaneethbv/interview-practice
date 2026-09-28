class DisjointSet:
    def __init__(self, size):
        self.parent = list(range(size))
        self.component_size = [1] * size

    def union(self, first, second):
        first_root = self.find(first)
        second_root = self.find(second)
        if first_root == second_root:
            return False
        if self.component_size[first_root] < self.component_size[second_root]:
            first_root, second_root = second_root, first_root
        self.parent[second_root] = first_root
        self.component_size[first_root] += self.component_size[second_root]
        return True

    def find(self, node):
        while self.parent[node] != node:
            self.parent[node] = self.parent[self.parent[node]]
            node = self.parent[node]
        return node


class Solution:
    def maxNumEdgesToRemove(self, n, edges):
        alice = DisjointSet(n + 1)
        bob = DisjointSet(n + 1)
        used = 0
        alice_edges = 0
        bob_edges = 0
        for edge_type, first, second in sorted(edges, reverse=True):
            if edge_type == 3:
                alice_joined = alice.union(first, second)
                bob_joined = bob.union(first, second)
                alice_edges += alice_joined
                bob_edges += bob_joined
                used += alice_joined or bob_joined
            elif edge_type == 1:
                alice_joined = alice.union(first, second)
                alice_edges += alice_joined
                used += alice_joined
            else:
                bob_joined = bob.union(first, second)
                bob_edges += bob_joined
                used += bob_joined
        if alice_edges != n - 1 or bob_edges != n - 1:
            return -1
        return len(edges) - used
