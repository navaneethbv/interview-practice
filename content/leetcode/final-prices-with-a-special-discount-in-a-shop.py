class Solution:
    def finalPrices(self, prices):
        result=prices[:]; stack=[]
        for i,price in enumerate(prices):
            while stack and prices[stack[-1]]>=price: result[stack.pop()]-=price
            stack.append(i)
        return result
