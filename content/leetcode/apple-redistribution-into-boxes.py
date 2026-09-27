class Solution:
    def minimumBoxes(self, apple, capacity):
        remaining = sum(apple)
        sorted_capacity = sorted(capacity, reverse=True)
        for box_count, size in enumerate(sorted_capacity, 1):
            remaining -= size
            if remaining <= 0:
                return box_count
