class Solution:
    def copyRandomList(self, head):
        copies = {None: None}
        current = head
        while current:
            copies[current] = Node(current.val)
            current = current.next
        current = head
        while current:
            copies[current].next = copies[current.next]
            copies[current].random = copies[current.random]
            current = current.next
        return copies[head]
