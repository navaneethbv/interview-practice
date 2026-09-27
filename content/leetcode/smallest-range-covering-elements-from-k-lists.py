import heapq
class Solution:
    def smallestRange(self, nums):
        pending = [(row[0], row_index, 0)
                   for row_index, row in enumerate(nums)]
        heapq.heapify(pending)
        high = max(row[0] for row in nums)
        answer = [pending[0][0], high]
        while True:
            low, row_index, value_index = heapq.heappop(pending)
            current_length = high - low
            answer_length = answer[1] - answer[0]
            if (current_length < answer_length
                    or (current_length == answer_length and low < answer[0])):
                answer = [low, high]
            next_index = value_index + 1
            if next_index == len(nums[row_index]):
                break
            next_value = nums[row_index][next_index]
            high = max(high, next_value)
            heapq.heappush(pending, (next_value, row_index, next_index))
        return answer
