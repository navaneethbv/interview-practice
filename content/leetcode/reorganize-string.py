from collections import Counter
import heapq


class Solution:
    def reorganizeString(self, s):
        heap = [(-count, character) for character, count in Counter(s).items()]
        heapq.heapify(heap)
        previous_count = 0
        previous_character = ""
        output = []
        while heap:
            count, character = heapq.heappop(heap)
            output.append(character)
            if previous_count < 0:
                heapq.heappush(heap, (previous_count, previous_character))
            previous_count = count + 1
            previous_character = character
        result = "".join(output)
        return result if len(result) == len(s) else ""
