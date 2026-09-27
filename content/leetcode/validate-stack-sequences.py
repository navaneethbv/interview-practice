class Solution:
    def validateStackSequences(self,pushed,popped):
        stack=[];j=0
        for value in pushed:
            stack.append(value)
            while stack and stack[-1]==popped[j]:stack.pop();j+=1
        return not stack
