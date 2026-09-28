class Solution:
    def numComponents(self, head, nums):
        selected = set(nums)
        components = 0
        inside = False
        while head:
            selected_node = head.val in selected
            if selected_node and not inside:
                components += 1
            inside = selected_node
            head = head.next
        return components
