class Solution:
    def maxDistToClosest(self, seats):
        first_occupied = None
        previous_occupied = None
        best_distance = 0
        for index, occupied in enumerate(seats):
            if not occupied:
                continue
            if first_occupied is None:
                first_occupied = index
                best_distance = index
            elif previous_occupied is not None:
                best_distance = max(best_distance, (index - previous_occupied) // 2)
            previous_occupied = index
        best_distance = max(best_distance, len(seats) - 1 - previous_occupied)
        return best_distance
