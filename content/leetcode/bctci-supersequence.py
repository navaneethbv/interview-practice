class Solution:
    def hasSupersequence(self, arr):
        edges = {letter: set() for word in arr for letter in word}
        for word in arr:
            if len(set(word)) != len(word):
                return False
            for first, second in zip(word, word[1:]):
                edges[first].add(second)
        indegree = dict.fromkeys(edges, 0)
        for targets in edges.values():
            for letter in targets:
                indegree[letter] += 1
        ready = [letter for letter, count in indegree.items() if count == 0]
        placed = 0
        while ready:
            letter = ready.pop()
            placed += 1
            for nxt in edges[letter]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    ready.append(nxt)
        return placed == len(edges)
