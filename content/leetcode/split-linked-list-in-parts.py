class Solution:
    def splitListToParts(self, head, k):
        length = self._length(head)
        base, extra = divmod(length, k)
        parts = []
        for index in range(k):
            parts.append(head)
            size = base + (index < extra)
            head = self._cut_part(head, size)
        return parts

    def _length(self, head):
        length = 0
        while head:
            length += 1
            head = head.next
        return length

    def _cut_part(self, head, size):
        if size == 0:
            return head
        tail = head
        for _ in range(size - 1):
            tail = tail.next
        following = tail.next
        tail.next = None
        return following
