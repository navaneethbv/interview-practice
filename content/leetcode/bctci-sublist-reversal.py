class Solution:
    def reverseSublist(self, head, left, right):
        dummy = ListNode(0)
        dummy.next = head
        before = dummy
        for _ in range(left):
            if before.next is None:
                return head
            before = before.next
        first = before.next
        if first is None:
            return head
        for _ in range(right - left):
            moved = first.next
            if moved is None:
                break
            first.next = moved.next
            moved.next = before.next
            before.next = moved
        return dummy.next
