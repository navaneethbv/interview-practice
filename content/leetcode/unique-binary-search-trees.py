class Solution:
    def numTrees(self, n):
        tree_counts = [0] * (n + 1)
        tree_counts[0] = 1
        for size in range(1, n + 1):
            for left_size in range(size):
                right_size = size - 1 - left_size
                tree_counts[size] += tree_counts[left_size] * tree_counts[right_size]
        return tree_counts[n]
