class Solution:
    def _include(self, need, letter):
        if letter not in need:
            return 0
        need[letter] -= 1
        return int(need[letter] == 0)

    def _exclude(self, need, letter):
        if letter not in need:
            return 0
        need[letter] += 1
        return int(need[letter] == 1)

    def shortestWithAllLetters(self, s1, s2):
        need = {}
        for letter in s2:
            need[letter] = need.get(letter, 0) + 1
        missing = len(need)
        left = 0
        best = len(s1) + 1
        for right, letter in enumerate(s1):
            missing -= self._include(need, letter)
            while missing == 0:
                best = min(best, right - left + 1)
                missing += self._exclude(need, s1[left])
                left += 1
        return best if best <= len(s1) else -1
