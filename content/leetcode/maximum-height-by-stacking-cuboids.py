class Solution:
    def maxHeight(self, cuboids):
        normalized = [sorted(cuboid) for cuboid in cuboids]
        normalized.sort()
        best_at = [0] * len(normalized)
        answer = 0
        for index, cuboid in enumerate(normalized):
            best_at[index] = cuboid[2]
            for previous in range(index):
                if all(normalized[previous][axis] <= cuboid[axis] for axis in range(3)):
                    best_at[index] = max(best_at[index], best_at[previous] + cuboid[2])
            answer = max(answer, best_at[index])
        return answer
