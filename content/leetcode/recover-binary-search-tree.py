class Solution:
    def recoverTree(self, root):
        stack = []
        previous = None
        first_wrong = None
        second_wrong = None
        current = root

        while current or stack:
            while current:
                stack.append(current)
                current = current.left
            current = stack.pop()
            if previous and previous.val > current.val:
                if first_wrong is None:
                    first_wrong = previous
                second_wrong = current
            previous = current
            current = current.right

        if first_wrong is not None and second_wrong is not None:
            first_wrong.val, second_wrong.val = second_wrong.val, first_wrong.val
