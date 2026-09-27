class Solution:
    def findSecretWord(self, words, master):
        candidates = words[:]
        for _ in range(10):
            best_word = candidates[0]
            best_worst_group = len(candidates)
            for word in candidates:
                groups = [0] * 7
                for candidate in candidates:
                    groups[self._matches(word, candidate)] += 1
                worst_group = max(groups)
                if worst_group < best_worst_group:
                    best_worst_group = worst_group
                    best_word = word
            matches = master.guess(best_word)
            if matches == 6:
                return
            candidates = [word for word in candidates if self._matches(best_word, word) == matches]

    def _matches(self, first, second):
        return sum(left == right for left, right in zip(first, second))
