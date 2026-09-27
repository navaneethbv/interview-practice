class Solution:
    def removeElements(self,head,val):
        dummy=ListNode(0);dummy.next=head;node=dummy
        while node.next:
            if node.next.val==val:node.next=node.next.next
            else:node=node.next
        return dummy.next
