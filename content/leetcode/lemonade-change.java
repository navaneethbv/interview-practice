class Solution {
    public boolean lemonadeChange(int[] bills) {
        int fiveDollarBills = 0;
        int tenDollarBills = 0;
        for (int bill : bills) {
            if (bill == 5) {
                fiveDollarBills++;
            } else if (bill == 10) {
                fiveDollarBills--;
                tenDollarBills++;
            } else if (tenDollarBills > 0 && fiveDollarBills > 0) {
                tenDollarBills--;
                fiveDollarBills--;
            } else {
                fiveDollarBills -= 3;
            }
            if (fiveDollarBills < 0) {
                return false;
            }
        }
        return true;
    }
}
