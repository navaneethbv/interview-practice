class Solution:
    def minAvailableDuration(self, slots1, slots2, duration):
        first_slots = sorted(slots1)
        second_slots = sorted(slots2)
        first = 0
        second = 0
        while first < len(first_slots) and second < len(second_slots):
            start = max(first_slots[first][0], second_slots[second][0])
            end = min(first_slots[first][1], second_slots[second][1])
            if end - start >= duration:
                return [start, start + duration]
            if first_slots[first][1] < second_slots[second][1]:
                first += 1
            else:
                second += 1
        return []
