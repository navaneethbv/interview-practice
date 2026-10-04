class Solution:
    def shortestWithAllLetters(self, s1, s2):
        need = {}
        for letter in s2:
            need[letter] = need.get(letter, 0) + 1
        missing = len(need)
        left = 0
        best = len(s1) + 1
        for right, letter in enumerate(s1):
            if letter in need:
                need[letter] -= 1
                if need[letter] == 0:
                    missing -= 1
            while missing == 0:
                best = min(best, right - left + 1)
                leaving = s1[left]
                if leaving in need:
                    need[leaving] += 1
                    if need[leaving] == 1:
                        missing += 1
                left += 1
        return best if best <= len(s1) else -1
