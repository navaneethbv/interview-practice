class Solution:
    def alienOrder(self, words):
        edges = {c:set() for word in words for c in word}
        degree = {c:0 for c in edges}
        for a,b in zip(words,words[1:]):
            for x,y in zip(a,b):
                if x != y:
                    if y not in edges[x]:
                        edges[x].add(y); degree[y] += 1
                    break
            else:
                if len(a) > len(b):
                    return ''
        queue = sorted(c for c in degree if degree[c] == 0)
        for c in queue:
            for nxt in sorted(edges[c]):
                degree[nxt] -= 1
                if degree[nxt] == 0:
                    queue.append(nxt)
        return ''.join(queue) if len(queue) == len(edges) else ''
