class Solution:
    def removeNthFromEnd(self, head, n):
        dummy = ListNode(0, head)
        fast = dummy
        for _ in range(n):
            fast = fast.next
        slow = dummy
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
