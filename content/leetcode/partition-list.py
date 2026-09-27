class Solution:
    def partition(self, head, x):
        small=st=ListNode(0);large=lt=ListNode(0)
        while head:
            if head.val<x:st.next=head;st=head
            else:lt.next=head;lt=head
            head=head.next
        lt.next=None;st.next=large.next
        return small.next
