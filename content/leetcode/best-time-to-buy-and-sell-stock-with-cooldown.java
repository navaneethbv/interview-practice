class Solution {
public int maxProfit(int[] prices){int hold=-prices[0],sold=-1000000000,rest=0;for(int i=1;i<prices.length;i++){int h=Math.max(hold,rest-prices[i]),s=hold+prices[i],r=Math.max(rest,sold);hold=h;sold=s;rest=r;}return Math.max(sold,rest);}
}
