class Solution:
    def sortList(self, head):
        if not head or not head.next:return head
        slow,fast=head,head.next
        while fast and fast.next:slow=slow.next;fast=fast.next.next
        right=slow.next;slow.next=None
        a,b=self.sortList(head),self.sortList(right)
        dummy=tail=ListNode(0)
        while a and b:
            if a.val<=b.val:tail.next=a;a=a.next
            else:tail.next=b;b=b.next
            tail=tail.next
        tail.next=a or b
        return dummy.next
