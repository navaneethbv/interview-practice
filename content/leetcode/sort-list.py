class Solution:
    def sortList(self, head):
        if not head or not head.next:
            return head
        slow = head
        fast = head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        right_head = slow.next
        slow.next = None
        left_sorted = self.sortList(head)
        right_sorted = self.sortList(right_head)
        return self._merge(left_sorted, right_sorted)

    def _merge(self, left, right):
        dummy = ListNode(0)
        tail = dummy
        while left and right:
            if left.val <= right.val:
                tail.next = left
                left = left.next
            else:
                tail.next = right
                right = right.next
            tail = tail.next
        tail.next = left or right
        return dummy.next
