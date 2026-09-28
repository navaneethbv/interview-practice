class Solution:
    def equationsPossible(self, equations):
        parent = list(range(26))
        for equation in equations:
            if equation[1] == '=':
                left = ord(equation[0]) - ord('a')
                right = ord(equation[3]) - ord('a')
                parent[self._find(parent, left)] = self._find(parent, right)
        for equation in equations:
            if equation[1] == '!':
                left = ord(equation[0]) - ord('a')
                right = ord(equation[3]) - ord('a')
                if self._find(parent, left) == self._find(parent, right):
                    return False
        return True

    def _find(self, parent, node):
        while parent[node] != node:
            parent[node] = parent[parent[node]]
            node = parent[node]
        return node
