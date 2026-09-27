class Solution:
    def canPlaceFlowers(self, flowerbed, n):
        for i in range(len(flowerbed)):
            if flowerbed[i]==0 and (i==0 or flowerbed[i-1]==0) and (i+1==len(flowerbed) or flowerbed[i+1]==0):
                flowerbed[i]=1;n-=1
        return n<=0
