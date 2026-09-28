class Solution:
    def copyList(self, head):
        dummy = ListNode(0)
        tail = dummy
        while head:
            tail.next = ListNode(head.val)
            tail = tail.next
            head = head.next
        return dummy.next
