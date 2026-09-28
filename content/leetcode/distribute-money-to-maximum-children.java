class Solution {
    public int distMoney(int money, int children) {
        if (money < children) {
            return -1;
        }
        int extra = money - children;
        int fullShares = Math.min(extra / 7, children);
        extra -= fullShares * 7;
        int remainingChildren = children - fullShares;
        if ((remainingChildren == 0 && extra > 0)
                || (remainingChildren == 1 && extra == 3)) {
            fullShares--;
        }
        return fullShares;
    }
}
