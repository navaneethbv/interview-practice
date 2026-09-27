class Solution:
    def rotateRight(self, head, k):
        if not head:return head
        tail=head;n=1
        while tail.next:tail=tail.next;n+=1
        k%=n
        if not k:return head
        tail.next=head
        for _ in range(n-k):tail=tail.next
        result=tail.next;tail.next=None
        return result
