class Solution {
public String countAndSay(int n){String s="1";while(--n>0){StringBuilder out=new StringBuilder();for(int i=0;i<s.length();){int j=i+1;while(j<s.length()&&s.charAt(j)==s.charAt(i))j++;out.append(j-i).append(s.charAt(i));i=j;}s=out.toString();}return s;}
}
