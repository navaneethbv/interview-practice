class Solution:
    def findRestaurant(self, list1, list2):
        indices={word:i for i,word in enumerate(list1)};best=float('inf');out=[]
        for j,word in enumerate(list2):
            if word not in indices:continue
            total=indices[word]+j
            if total<best:best=total;out=[word]
            elif total==best:out.append(word)
        return out
