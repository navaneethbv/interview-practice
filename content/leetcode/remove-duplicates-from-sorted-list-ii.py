class Solution:
    def deleteDuplicates(self,head):
        dummy=ListNode(0);tail=dummy
        while head:
            end=head.next
            while end and end.val==head.val:end=end.next
            if head.next is end:tail.next=head;tail=head
            head=end
        tail.next=None
        return dummy.next
