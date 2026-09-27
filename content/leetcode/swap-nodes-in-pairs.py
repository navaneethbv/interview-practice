class Solution:
    def swapPairs(self, head):
        dummy = ListNode(0,head)
        previous = dummy
        while previous.next and previous.next.next:
            first = previous.next
            second = first.next
            first.next = second.next
            second.next = first
            previous.next = second
            previous = first
        return dummy.next
