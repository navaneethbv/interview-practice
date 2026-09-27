class Solution:
    def letterCombinations(self, digits):
        keys = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
        result = [''] if digits else []
        for digit in digits:
            result = [prefix+c for prefix in result for c in keys[digit]]
        return result
