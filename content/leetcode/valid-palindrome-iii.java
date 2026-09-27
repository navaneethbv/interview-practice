class Solution {
public boolean isValidPalindrome(String s,int k){int n=s.length();int[]dp=new int[n];for(int l=n-2;l>=0;l--){int diagonal=0;for(int r=l+1;r<n;r++){int old=dp[r];dp[r]=s.charAt(l)==s.charAt(r)?diagonal:1+Math.min(dp[r],dp[r-1]);diagonal=old;}}return dp[n-1]<=k;}
}
