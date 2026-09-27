class Solution:
    def combinationSum(self, candidates, target):
        candidates = sorted(candidates); result = []
        def search(start,remaining,path):
            if remaining == 0: result.append(path[:]); return
            for i in range(start,len(candidates)):
                value = candidates[i]
                if value > remaining: break
                path.append(value); search(i,remaining-value,path); path.pop()
        search(0,target,[])
        return result
