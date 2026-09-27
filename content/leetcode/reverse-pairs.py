class Solution:
    def reversePairs(self, nums):
        def sort(values):
            if len(values)<2: return values,0
            middle=len(values)//2; left,a=sort(values[:middle]); right,b=sort(values[middle:]); count=a+b; j=0
            for value in left:
                while j<len(right) and value>2*right[j]: j+=1
                count+=j
            merged=[]; i=j=0
            while i<len(left) and j<len(right):
                if left[i]<=right[j]: merged.append(left[i]); i+=1
                else: merged.append(right[j]); j+=1
            return merged+left[i:]+right[j:],count
        return sort(nums)[1]
