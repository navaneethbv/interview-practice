class Solution:
    def nextGreaterElement(self, nums1, nums2):
        stack=[]; following={}
        for value in nums2:
            while stack and stack[-1]<value: following[stack.pop()]=value
            stack.append(value)
        return [following.get(value,-1) for value in nums1]
