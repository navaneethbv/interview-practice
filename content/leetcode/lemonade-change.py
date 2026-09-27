class Solution:
    def lemonadeChange(self, bills):
        five_dollar_bills = 0
        ten_dollar_bills = 0
        for bill in bills:
            if bill == 5:
                five_dollar_bills += 1
            elif bill == 10:
                five_dollar_bills -= 1
                ten_dollar_bills += 1
            elif ten_dollar_bills and five_dollar_bills:
                ten_dollar_bills -= 1
                five_dollar_bills -= 1
            else:
                five_dollar_bills -= 3
            if five_dollar_bills < 0:
                return False
        return True
