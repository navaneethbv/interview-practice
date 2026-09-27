from collections import Counter
class Solution:
    def frequencySort(self,s):
        return ''.join(ch*count for ch,count in Counter(s).most_common())
