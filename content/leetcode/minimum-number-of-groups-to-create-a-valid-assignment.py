class Solution:
    def minGroupsForValidAssignment(self, balls):
        from collections import Counter
        frequencies=list(Counter(balls).values())
        for small in range(min(frequencies),0,-1):
            total=0
            for count in frequencies:
                groups=(count+small)//(small+1)
                if groups*small>count: break
                total+=groups
            else: return total
