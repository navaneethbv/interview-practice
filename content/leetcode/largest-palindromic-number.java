class Solution {
public String largestPalindromic(String num){int[] c=new int[10];for(char d:num.toCharArray())c[d-'0']++;StringBuilder s=new StringBuilder();for(int d=9;d>=0;d--)if(d!=0||s.length()>0){s.append(String.valueOf(d).repeat(c[d]/2));c[d]%=2;}String mid="";for(int d=9;d>=0;d--)if(c[d]>0){mid=""+d;break;}String a=s.toString()+mid+s.reverse();return a.isEmpty()?"0":a;}
}
