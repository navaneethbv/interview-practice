class Solution:
    def sortedArrayToBST(self, nums):
        def build(left, right):
            if left >= right:
                return None
            middle = (left + right) // 2
            left_subtree = build(left, middle)
            right_subtree = build(middle + 1, right)
            return TreeNode(nums[middle], left_subtree, right_subtree)

        return build(0, len(nums))
