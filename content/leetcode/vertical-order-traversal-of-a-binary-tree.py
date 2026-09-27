class Solution:
    def verticalTraversal(self, root):
        positions = []
        stack = [(root, 0, 0)]
        while stack:
            node, row, column = stack.pop()
            positions.append((column, row, node.val))
            if node.left:
                stack.append((node.left, row + 1, column - 1))
            if node.right:
                stack.append((node.right, row + 1, column + 1))

        positions.sort()
        columns = []
        previous_column = None
        for column, row, value in positions:
            if column != previous_column:
                columns.append([])
                previous_column = column
            columns[-1].append(value)
        return columns
