class Solution:
    def zipLists(self, head1, head2):
        dummy = ListNode(0)
        tail = dummy
        while head1 and head2:
            tail.next = head1
            head1 = head1.next
            tail = tail.next
            tail.next = head2
            head2 = head2.next
            tail = tail.next
        tail.next = head1 if head1 else head2
        return dummy.next
