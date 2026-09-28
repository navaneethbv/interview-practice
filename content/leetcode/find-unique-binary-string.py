class Solution:
    def findDifferentBinaryString(self, nums):
        result = []
        for index, value in enumerate(nums):
            result.append("1" if value[index] == "0" else "0")
        return "".join(result)
