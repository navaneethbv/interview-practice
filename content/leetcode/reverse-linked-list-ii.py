class Solution:
    def reverseBetween(self, head, left, right):
        dummy = ListNode(0, head)
        before_reversed = dummy
        for _ in range(left - 1):
            before_reversed = before_reversed.next
        first_node = before_reversed.next
        for _ in range(right - left):
            moved_node = first_node.next
            first_node.next = moved_node.next
            moved_node.next = before_reversed.next
            before_reversed.next = moved_node
        return dummy.next
