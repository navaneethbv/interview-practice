class Solution:
    def trap(self, height):
        left,right = 0,len(height)-1
        low_left = low_right = total = 0
        while left <= right:
            if low_left <= low_right:
                low_left = max(low_left,height[left]); total += low_left-height[left]; left += 1
            else:
                low_right = max(low_right,height[right]); total += low_right-height[right]; right -= 1
        return total
