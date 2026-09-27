class Solution:
    def closestValue(self, root, target):
        best_value = root.val
        current = root
        while current is not None:
            current_distance = abs(current.val - target)
            best_distance = abs(best_value - target)
            if current_distance < best_distance or (
                current_distance == best_distance and current.val < best_value
            ):
                best_value = current.val
            if target < current.val:
                current = current.left
            else:
                current = current.right
        return best_value
