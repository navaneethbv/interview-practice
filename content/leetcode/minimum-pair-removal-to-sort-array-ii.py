class Solution:
    def minimumPairRemoval(self, nums):
        import heapq

        size = len(nums)
        values = nums[:]
        previous = [index - 1 for index in range(size)]
        following = [index + 1 if index + 1 < size else -1 for index in range(size)]
        alive = [True] * size
        pair_heap = [(values[index] + values[index + 1], index, index + 1)
                     for index in range(size - 1)]
        heapq.heapify(pair_heap)

        def is_inversion(left, right):
            return left != -1 and right != -1 and values[left] > values[right]

        inversions = sum(is_inversion(index, index + 1) for index in range(size - 1))
        operations = 0
        while inversions:
            pair_sum, left, right = heapq.heappop(pair_heap)
            if (not alive[left] or not alive[right] or following[left] != right
                    or values[left] + values[right] != pair_sum):
                continue

            before = previous[left]
            after = following[right]
            inversions -= (is_inversion(before, left) + is_inversion(left, right)
                           + is_inversion(right, after))
            values[left] = pair_sum
            alive[right] = False
            following[left] = after
            if after != -1:
                previous[after] = left
            inversions += is_inversion(before, left) + is_inversion(left, after)
            if before != -1:
                heapq.heappush(pair_heap, (values[before] + values[left], before, left))
            if after != -1:
                heapq.heappush(pair_heap, (values[left] + values[after], left, after))
            operations += 1
        return operations
