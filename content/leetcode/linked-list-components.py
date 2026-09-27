class Solution:
    def numComponents(self, head, nums):
        selected=set(nums);count=0;inside=False
        while head:
            current=head.val in selected
            if current and not inside:count+=1
            inside=current;head=head.next
        return count
