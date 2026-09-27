class Solution {
public String shortestPalindrome(String s){String rev=new StringBuilder(s).reverse().toString(),combined=s+"#"+rev;int[]prefix=new int[combined.length()];for(int i=1;i<combined.length();i++){int j=prefix[i-1];while(j>0&&combined.charAt(i)!=combined.charAt(j))j=prefix[j-1];if(combined.charAt(i)==combined.charAt(j))j++;prefix[i]=j;}return rev.substring(0,s.length()-prefix[prefix.length-1])+s;}
}
