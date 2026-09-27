class Solution:
    def splitListToParts(self, head, k):
        n=0;node=head
        while node:n+=1;node=node.next
        base,extra=divmod(n,k);out=[]
        for i in range(k):
            out.append(head);size=base+(i<extra)
            for _ in range(max(0,size-1)):head=head.next
            if size:following=head.next;head.next=None;head=following
        return out
