class Solution:
    def findMode(self, root):
        stack = []
        previous = None
        run_length = 0
        best_length = 0
        modes = []
        while root or stack:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            if root.val == previous:
                run_length += 1
            else:
                run_length = 1
            previous = root.val
            if run_length > best_length:
                best_length = run_length
                modes = [root.val]
            elif run_length == best_length:
                modes.append(root.val)
            root = root.right
        return modes
