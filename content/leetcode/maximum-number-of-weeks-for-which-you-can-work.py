class Solution:
    def numberOfWeeks(self, milestones):
        total = sum(milestones)
        largest = max(milestones)
        return min(total, 2 * (total - largest) + 1)
