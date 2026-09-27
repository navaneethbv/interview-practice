from collections import Counter
class Solution:
    def topKFrequent(self,nums,k):
        counts=Counter(nums)
        buckets=[[] for _ in range(len(nums)+1)]
        for value,count in counts.items(): buckets[count].append(value)
        result=[]
        for bucket in reversed(buckets):
            result.extend(bucket)
            if len(result)>=k: return result[:k]
