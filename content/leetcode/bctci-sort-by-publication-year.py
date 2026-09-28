class Solution:
    FIRST_YEAR = 1000
    LAST_YEAR = 2025

    def sortByYear(self, books):
        buckets = [[] for _ in range(self.LAST_YEAR - self.FIRST_YEAR + 1)]
        for book in books:
            buckets[int(book[4]) - self.FIRST_YEAR].append(book)
        return [book for bucket in buckets for book in bucket]
