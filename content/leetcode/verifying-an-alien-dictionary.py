class Solution:
    def isAlienSorted(self, words, order):
        rank = {character: index for index, character in enumerate(order)}
        for index in range(len(words) - 1):
            first = words[index]
            second = words[index + 1]
            if not self._in_order(first, second, rank):
                return False
        return True

    def _in_order(self, first, second, rank):
        for left, right in zip(first, second):
            if left != right:
                return rank[left] < rank[right]
        return len(first) <= len(second)
