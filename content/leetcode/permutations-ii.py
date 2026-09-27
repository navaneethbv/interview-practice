from collections import Counter
class Solution:
    def permuteUnique(self, nums):
        counts=Counter(nums);out=[]
        def visit(path):
            if len(path)==len(nums):out.append(path);return
            for value in counts:
                if counts[value]:counts[value]-=1;visit(path+[value]);counts[value]+=1
        visit([]);return out
