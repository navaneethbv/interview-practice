class Solution {
public String longestPrefix(String s){int[]p=new int[s.length()];for(int i=1;i<s.length();i++){int j=p[i-1];while(j>0&&s.charAt(i)!=s.charAt(j))j=p[j-1];if(s.charAt(i)==s.charAt(j))j++;p[i]=j;}return s.substring(0,p[p.length-1]);}
}
