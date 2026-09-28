class Solution:
    def oneAway(self, first, second):
        if abs(len(first) - len(second)) > 1:
            return False
        if len(first) > len(second):
            first, second = second, first
        left = 0
        right = 0
        differences = 0
        while left < len(first) and right < len(second):
            if first[left] == second[right]:
                left += 1
                right += 1
                continue
            differences += 1
            if differences > 1:
                return False
            if len(first) == len(second):
                left += 1
            right += 1
        return True
