class Solution:
    def kthToLast(self, head, k):
        lead = head
        for _ in range(k):
            lead = lead.next
        trail = head
        while lead:
            lead = lead.next
            trail = trail.next
        return trail.val
