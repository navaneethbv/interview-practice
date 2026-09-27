class Solution:
    def minIncrementForUnique(self, nums):
        next_value=0;moves=0
        for value in sorted(nums):
            chosen=max(next_value,value);moves+=chosen-value;next_value=chosen+1
        return moves
