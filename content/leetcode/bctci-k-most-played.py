import heapq


class Solution:
    def kMostPlayed(self, titles, plays, k):
        weakest = []
        for title, count in zip(titles, plays):
            entry = (count, [-ord(letter) for letter in title] + [1], title)
            if len(weakest) < k:
                heapq.heappush(weakest, entry)
            elif entry > weakest[0]:
                heapq.heapreplace(weakest, entry)
        return [title for _, _, title in weakest]
