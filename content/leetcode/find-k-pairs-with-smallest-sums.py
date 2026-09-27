import heapq


class Solution:
    def kSmallestPairs(self, nums1, nums2, k):
        if not nums1 or not nums2 or k == 0:
            return []

        heap = []
        for first_index in range(min(k, len(nums1))):
            heapq.heappush(heap, (nums1[first_index] + nums2[0], first_index, 0))

        pairs = []
        while heap and len(pairs) < k:
            _, first_index, second_index = heapq.heappop(heap)
            pairs.append([nums1[first_index], nums2[second_index]])
            next_second = second_index + 1
            if next_second < len(nums2):
                heapq.heappush(
                    heap,
                    (nums1[first_index] + nums2[next_second],
                     first_index, next_second),
                )
        return pairs
