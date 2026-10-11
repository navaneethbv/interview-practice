import random


class Solution:
    def __init__(self, head):
        self.head = head

    def getRandom(self):
        chosen, node, seen = None, self.head, 0
        while node:
            seen += 1
            if random.randrange(seen) == 0:
                chosen = node.val
            node = node.next
        return chosen
