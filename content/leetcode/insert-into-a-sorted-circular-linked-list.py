class Solution:
    def insert(self, head, insertVal):
        if not head:
            head=Node(insertVal); head.next=head; return head
        node=head
        while True:
            nxt=node.next
            if node.val<=insertVal<=nxt.val or (node.val>nxt.val and (insertVal>=node.val or insertVal<=nxt.val)):
                break
            node=nxt
            if node is head: break
        node.next=Node(insertVal,node.next)
        return head
