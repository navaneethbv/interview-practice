class Solution:
    def closestMeetingNode(self, edges, node1, node2):
        first = self._distances(edges, node1)
        second = self._distances(edges, node2)
        best_distance = len(edges) + 1
        answer = -1
        for node in range(len(edges)):
            if first[node] >= 0 and second[node] >= 0:
                distance = max(first[node], second[node])
                if distance < best_distance:
                    best_distance = distance
                    answer = node
        return answer

    def _distances(self, edges, start):
        distances = [-1] * len(edges)
        node = start
        distance = 0
        while node != -1 and distances[node] == -1:
            distances[node] = distance
            distance += 1
            node = edges[node]
        return distances
