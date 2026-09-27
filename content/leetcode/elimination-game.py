class Solution:
    def lastRemaining(self, n):
        head=step=1; left=True
        while n>1:
            if left or n%2: head+=step
            n//=2; step*=2; left=not left
        return head
