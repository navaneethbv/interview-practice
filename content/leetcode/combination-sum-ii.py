class Solution:
    def combinationSum2(self, candidates, target):
        candidates = sorted(candidates); result = []
        def search(start,remaining,path):
            if remaining == 0: result.append(path[:]); return
            for i in range(start,len(candidates)):
                if i>start and candidates[i]==candidates[i-1]: continue
                value = candidates[i]
                if value>remaining: break
                path.append(value); search(i+1,remaining-value,path); path.pop()
        search(0,target,[])
        return result
