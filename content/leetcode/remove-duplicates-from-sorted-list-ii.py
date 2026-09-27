class Solution:
    def deleteDuplicates(self, head):
        dummy = ListNode(0)
        tail = dummy
        while head:
            next_distinct = head.next
            while next_distinct and next_distinct.val == head.val:
                next_distinct = next_distinct.next
            if head.next is next_distinct:
                tail.next = head
                tail = head
            head = next_distinct
        tail.next = None
        return dummy.next
