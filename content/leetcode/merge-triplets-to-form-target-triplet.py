class Solution:
    def mergeTriplets(self, triplets, target):
        reached = [False]*3
        for triplet in triplets:
            if all(a <= b for a,b in zip(triplet,target)):
                for i in range(3):
                    reached[i] |= triplet[i] == target[i]
        return all(reached)
