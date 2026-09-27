class Solution:
    def distMoney(self, money, children):
        if money < children:
            return -1
        extra = money - children
        full_shares = min(extra // 7, children)
        extra -= full_shares * 7
        remaining_children = children - full_shares
        if ((remaining_children == 0 and extra > 0)
                or (remaining_children == 1 and extra == 3)):
            full_shares -= 1
        return full_shares
