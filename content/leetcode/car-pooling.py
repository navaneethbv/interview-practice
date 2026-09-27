class Solution:
    def carPooling(self, trips, capacity):
        change=[0]*1001
        for count,start,end in trips:change[start]+=count;change[end]-=count
        passengers=0
        for delta in change:
            passengers+=delta
            if passengers>capacity:return False
        return True
