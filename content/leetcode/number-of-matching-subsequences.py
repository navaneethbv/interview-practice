class Solution:
    def numMatchingSubseq(self, s, words):
        import bisect
        from collections import defaultdict

        positions = defaultdict(list)
        for index, character in enumerate(s):
            positions[character].append(index)
        result = 0
        for word in words:
            previous_index = -1
            for character in word:
                indexes = positions[character]
                next_index = bisect.bisect_right(indexes, previous_index)
                if next_index == len(indexes):
                    break
                previous_index = indexes[next_index]
            else:
                result += 1
        return result
