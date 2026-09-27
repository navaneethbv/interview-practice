class Solution:
    def removeElements(self, head, val):
        dummy = ListNode(0)
        dummy.next = head
        previous = dummy
        while previous.next:
            if previous.next.val == val:
                previous.next = previous.next.next
            else:
                previous = previous.next
        return dummy.next
