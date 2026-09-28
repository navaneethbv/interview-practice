from bisect import bisect_left, bisect_right


class Solution:
    def numberOfPairs(self, nums1, nums2, diff):
        differences = [left - right for left, right in zip(nums1, nums2)]
        coordinates = sorted(set(differences))
        tree = [0] * (len(coordinates) + 1)
        answer = 0
        for value in differences:
            limit = bisect_right(coordinates, value + diff)
            answer += self._prefix_sum(tree, limit)
            position = bisect_left(coordinates, value) + 1
            self._add(tree, position)
        return answer

    def _prefix_sum(self, tree, position):
        answer = 0
        while position:
            answer += tree[position]
            position -= position & -position
        return answer

    def _add(self, tree, position):
        while position < len(tree):
            tree[position] += 1
            position += position & -position
