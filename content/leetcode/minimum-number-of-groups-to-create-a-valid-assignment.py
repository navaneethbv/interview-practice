class Solution:
    def minGroupsForValidAssignment(self, balls):
        from collections import Counter

        frequencies = list(Counter(balls).values())
        for smaller_size in range(min(frequencies), 0, -1):
            group_count = 0
            for frequency in frequencies:
                groups = (frequency + smaller_size) // (smaller_size + 1)
                if groups * smaller_size > frequency:
                    break
                group_count += groups
            else:
                return group_count
