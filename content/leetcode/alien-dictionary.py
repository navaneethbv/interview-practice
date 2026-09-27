class Solution:
    def alienOrder(self, words):
        graph = self._build_graph(words)
        if graph is None:
            return ''
        edges, degree = graph
        queue = sorted(c for c in degree if degree[c] == 0)
        for c in queue:
            for nxt in sorted(edges[c]):
                degree[nxt] -= 1
                if degree[nxt] == 0:
                    queue.append(nxt)
        return ''.join(queue) if len(queue) == len(edges) else ''

    def _build_graph(self, words):
        """Edges from each adjacent word pair's first difference; None when a word precedes its own prefix."""
        edges = {c:set() for word in words for c in word}
        degree = dict.fromkeys(edges, 0)
        for a,b in zip(words,words[1:]):
            pair = next(((x,y) for x,y in zip(a,b) if x != y), None)
            if pair is None:
                if len(a) > len(b):
                    return None
            elif pair[1] not in edges[pair[0]]:
                edges[pair[0]].add(pair[1]); degree[pair[1]] += 1
        return edges, degree
