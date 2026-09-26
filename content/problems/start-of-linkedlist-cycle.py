class Solution:
    def find_cycle_start(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow, fast = slow.next, fast.next.next
            if slow is fast:
                break
        p = head
        while p is not slow:
            p, slow = p.next, slow.next
        return p
