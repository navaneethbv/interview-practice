class Solution:
    def carPooling(self, trips, capacity):
        changes = [0] * 1001
        for count, start, end in trips:
            changes[start] += count
            changes[end] -= count
        passengers = 0
        for change in changes:
            passengers += change
            if passengers > capacity:
                return False
        return True
