class Solution:
    def reverseBetween(self, head, left, right):
        dummy=ListNode(0,head); before=dummy
        for _ in range(left-1): before=before.next
        start=before.next
        for _ in range(right-left):
            moving=start.next; start.next=moving.next
            moving.next=before.next; before.next=moving
        return dummy.next
