class Solution:
    def isStrobogrammatic(self, num):
        rotated={'0':'0','1':'1','8':'8','6':'9','9':'6'}
        return all(rotated.get(a)==b for a,b in zip(num,reversed(num)))
