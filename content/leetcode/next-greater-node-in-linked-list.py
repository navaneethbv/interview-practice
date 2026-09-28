class Solution:
    def nextLargerNodes(self, head):
        values = []
        while head:
            values.append(head.val)
            head = head.next
        result = [0] * len(values)
        decreasing_indices = []
        for index, value in enumerate(values):
            while (decreasing_indices
                   and values[decreasing_indices[-1]] < value):
                result[decreasing_indices.pop()] = value
            decreasing_indices.append(index)
        return result
