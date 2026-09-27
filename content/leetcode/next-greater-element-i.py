class Solution:
    def nextGreaterElement(self, nums1, nums2):
        decreasing_stack = []
        next_values = {}

        for value in nums2:
            while decreasing_stack and decreasing_stack[-1] < value:
                next_values[decreasing_stack.pop()] = value
            decreasing_stack.append(value)

        return [next_values.get(value, -1) for value in nums1]
