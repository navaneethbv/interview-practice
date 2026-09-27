class Solution {
public int myAtoi(String s){int i=0,sign=1;while(i<s.length()&&s.charAt(i)==' ')i++;if(i<s.length()&&(s.charAt(i)=='+'||s.charAt(i)=='-'))sign=s.charAt(i++)=='-'?-1:1;long value=0;while(i<s.length()&&s.charAt(i)>='0'&&s.charAt(i)<='9'){value=value*10+s.charAt(i++)-'0';if(sign*value>Integer.MAX_VALUE)return Integer.MAX_VALUE;if(sign*value<Integer.MIN_VALUE)return Integer.MIN_VALUE;}return (int)(sign*value);}
}
