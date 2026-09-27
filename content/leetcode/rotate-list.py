class Solution:
    def rotateRight(self, head, k):
        if not head:
            return head
        tail = head
        length = 1
        while tail.next:
            tail = tail.next
            length += 1
        rotations = k % length
        if rotations == 0:
            return head
        tail.next = head
        for _ in range(length - rotations):
            tail = tail.next
        new_head = tail.next
        tail.next = None
        return new_head
