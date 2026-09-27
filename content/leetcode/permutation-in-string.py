from collections import Counter


class Solution:
    def checkInclusion(self, s1, s2):
        wanted = Counter(s1)
        window = Counter()
        for index, character in enumerate(s2):
            window[character] += 1
            if index >= len(s1):
                outgoing = s2[index - len(s1)]
                window[outgoing] -= 1
                if window[outgoing] == 0:
                    del window[outgoing]
            if window == wanted:
                return True
        return False
