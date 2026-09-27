class Solution:
    def canThreePartsEqualSum(self, arr):
        total=sum(arr)
        if total%3:return False
        target=total//3;partial=parts=0
        for value in arr:
            partial+=value
            if partial==target:parts+=1;partial=0
        return parts>=3
