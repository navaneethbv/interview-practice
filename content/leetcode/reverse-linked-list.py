class Solution:
    def reverseList(self, head):
        previous = None
        while head:
            following = head.next
            head.next = previous
            previous,head = head,following
        return previous
