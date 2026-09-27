class Solution:
    def reorderList(self, head):
        slow,fast = head,head
        while fast.next and fast.next.next:
            slow,fast = slow.next,fast.next.next
        current,slow.next = slow.next,None
        previous = None
        while current:
            following = current.next
            current.next = previous
            previous,current = current,following
        first,second = head,previous
        while second:
            next_first,next_second = first.next,second.next
            first.next = second
            second.next = next_first
            first,second = next_first,next_second
