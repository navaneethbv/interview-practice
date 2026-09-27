class Solution:
    def sumSubarrayMins(self, arr):
        stack=[];total=0
        for right in range(len(arr)+1):
            while stack and (right==len(arr) or arr[stack[-1]]>=arr[right]):
                mid=stack.pop();left=stack[-1] if stack else -1;total+=arr[mid]*(mid-left)*(right-mid)
            stack.append(right)
        return total%1000000007
