class Solution:
    def maxProfit(self,prices,fee):
        cash=0;hold=-prices[0]
        for price in prices[1:]:cash,hold=max(cash,hold+price-fee),max(hold,cash-price)
        return cash
