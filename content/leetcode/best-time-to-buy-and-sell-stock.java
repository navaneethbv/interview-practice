class Solution {
public int maxProfit(int[] prices){ int low=prices[0],best=0; for(int p:prices){best=Math.max(best,p-low);low=Math.min(low,p);} return best;}
}
