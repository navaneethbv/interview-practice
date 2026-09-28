class Solution:
    def removeDups(self, head):
        seen = set()
        previous = None
        node = head
        while node:
            if node.val in seen:
                previous.next = node.next
            else:
                seen.add(node.val)
                previous = node
            node = node.next
        return head
