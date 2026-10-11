class Solution:
    def kMeans(self, points, k, iterations):
        centroids = [list(map(float, p)) for p in points[:k]]
        labels = [-1] * len(points)
        for _ in range(iterations):
            changed = False
            for i, (x, y) in enumerate(points):
                best = min(range(k), key=lambda j, x=x, y=y: ((x - centroids[j][0]) ** 2 + (y - centroids[j][1]) ** 2, j))
                if best != labels[i]:
                    labels[i] = best
                    changed = True
            if not changed:
                break
            for j in range(k):
                members = [points[i] for i in range(len(points)) if labels[i] == j]
                if members:
                    centroids[j] = [sum(p[0] for p in members) / len(members), sum(p[1] for p in members) / len(members)]
        return labels
