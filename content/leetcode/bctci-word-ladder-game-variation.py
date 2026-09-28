from collections import deque


class Solution:
    def canReach(self, word1, word2, words):
        valid = set(words)
        start_states = [(word1, "add"), (word1, "remove")]
        seen = set(start_states)
        queue = deque(start_states)
        while queue:
            word, move = queue.popleft()
            if word == word2:
                return True
            following = "remove" if move == "add" else "add"
            for candidate in self._moves(word, move, valid):
                state = (candidate, following)
                if state not in seen:
                    seen.add(state)
                    queue.append(state)
        return False

    def _moves(self, word, move, valid):
        if move == "remove":
            return [word[:i] + word[i + 1:] for i in range(len(word)) if word[:i] + word[i + 1:] in valid]
        letters = "abcdefghijklmnopqrstuvwxyz"
        return [word[:i] + c + word[i:] for i in range(len(word) + 1) for c in letters if word[:i] + c + word[i:] in valid]
