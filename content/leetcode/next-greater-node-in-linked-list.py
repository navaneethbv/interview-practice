class Solution:
    def nextLargerNodes(self, head):
        values=[]
        while head: values.append(head.val); head=head.next
        result=[0]*len(values); stack=[]
        for i,value in enumerate(values):
            while stack and values[stack[-1]]<value: result[stack.pop()]=value
            stack.append(i)
        return result
