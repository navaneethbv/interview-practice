class Solution:
    def minDeletionSize(self, strs):
        settled=[False]*(len(strs)-1); removed=0
        for column in range(len(strs[0])):
            if any(not settled[i] and strs[i][column]>strs[i+1][column] for i in range(len(settled))): removed+=1; continue
            for i in range(len(settled)): settled[i] |= strs[i][column]<strs[i+1][column]
        return removed
