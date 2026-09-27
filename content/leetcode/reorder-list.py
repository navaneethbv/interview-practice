class Solution:
    def reorderList(self, head):
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        second = self._reverse(slow.next)
        slow.next = None
        first = head
        while second:
            next_first = first.next
            next_second = second.next
            first.next = second
            second.next = next_first
            first = next_first
            second = next_second

    def _reverse(self, current):
        previous = None
        while current:
            following = current.next
            current.next = previous
            previous = current
            current = following
        return previous
