class Solution:
    def mergeTriplets(self, triplets, target):
        reached_coordinate = [False, False, False]
        for triplet in triplets:
            if any(value > limit for value, limit in zip(triplet, target)):
                continue
            for coordinate in range(3):
                if triplet[coordinate] == target[coordinate]:
                    reached_coordinate[coordinate] = True
        return all(reached_coordinate)
