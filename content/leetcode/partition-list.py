class Solution:
    def partition(self, head, x):
        smaller = smaller_tail = ListNode(0)
        larger = larger_tail = ListNode(0)
        while head:
            next_node = head.next
            if head.val < x:
                smaller_tail.next = head
                smaller_tail = head
            else:
                larger_tail.next = head
                larger_tail = head
            head = next_node
        larger_tail.next = None
        smaller_tail.next = larger.next
        return smaller.next
