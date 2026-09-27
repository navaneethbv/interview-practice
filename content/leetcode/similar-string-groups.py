class Solution:
    def numSimilarGroups(self, strs):
        parent = list(range(len(strs)))
        size = [1] * len(strs)

        def find(index):
            while parent[index] != index:
                parent[index] = parent[parent[index]]
                index = parent[index]
            return index

        def union(left, right):
            left_root = find(left)
            right_root = find(right)
            if left_root == right_root:
                return
            if size[left_root] < size[right_root]:
                left_root, right_root = right_root, left_root
            parent[right_root] = left_root
            size[left_root] += size[right_root]

        for right in range(len(strs)):
            for left in range(right):
                differences = sum(a != b for a, b in zip(strs[left], strs[right]))
                if differences <= 2:
                    union(left, right)
        return len({find(index) for index in range(len(strs))})
