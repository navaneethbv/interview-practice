class Solution:
    def alienOrder(self, words):
        edges = {letter: set() for word in words for letter in word}
        degree = dict.fromkeys(edges, 0)
        for index in range(1, len(words)):
            if not self._add_relation(words[index - 1], words[index], edges, degree):
                return ''
        queue = sorted(letter for letter in degree if degree[letter] == 0)
        for letter in queue:
            for dependent in sorted(edges[letter]):
                degree[dependent] -= 1
                if degree[dependent] == 0:
                    queue.append(dependent)
        return ''.join(queue) if len(queue) == len(edges) else ''

    def _add_relation(self, first, second, edges, degree):
        for before, after in zip(first, second):
            if before != after:
                if after not in edges[before]:
                    edges[before].add(after)
                    degree[after] += 1
                return True
        return len(first) <= len(second)
