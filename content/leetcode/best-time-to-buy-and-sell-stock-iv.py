class Solution:
    def maxProfit(self,k,prices):
        buy=[float('-inf')]*(k+1);sell=[0]*(k+1)
        for price in prices:
            for j in range(1,k+1):
                buy[j]=max(buy[j],sell[j-1]-price)
                sell[j]=max(sell[j],buy[j]+price)
        return sell[k]
