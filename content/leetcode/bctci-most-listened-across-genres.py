import heapq


class Solution:
    def mostListened(self, titles, plays, k):
        heap = [(-plays[g][0], g, 0) for g in range(len(titles))]
        heapq.heapify(heap)
        result = []
        while len(result) < k:
            _, genre, index = heapq.heappop(heap)
            result.append(titles[genre][index])
            if index + 1 < len(titles[genre]):
                heapq.heappush(heap, (-plays[genre][index + 1], genre, index + 1))
        return result
