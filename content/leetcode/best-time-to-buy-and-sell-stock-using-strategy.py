class Solution:
    def maxProfit(self, prices, strategy, k):
        original=[0]; values=[0]
        for price,action in zip(prices,strategy): original.append(original[-1]+price*action); values.append(values[-1]+price)
        best=original[-1]
        for start in range(len(prices)-k+1):
            end=start+k; gain=values[end]-values[start+k//2]-(original[end]-original[start]); best=max(best,original[-1]+gain)
        return best
