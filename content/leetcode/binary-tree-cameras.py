class Solution:
    def minCameraCover(self, root):
        cameras = 0
        states = {}
        stack = [(root, False)]
        while stack:
            node, expanded = stack.pop()
            if node is None:
                continue
            if not expanded:
                stack.append((node, True))
                stack.append((node.right, False))
                stack.append((node.left, False))
                continue
            left_state = states.get(id(node.left), 1)
            right_state = states.get(id(node.right), 1)
            if left_state == 0 or right_state == 0:
                cameras += 1
                states[id(node)] = 2
            elif left_state == 2 or right_state == 2:
                states[id(node)] = 1
            else:
                states[id(node)] = 0
        if root is not None and states[id(root)] == 0:
            cameras += 1
        return cameras
