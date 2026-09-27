class Solution {
public boolean validWordAbbreviation(String word,String abbr) {int i=0,j=0;while(j<abbr.length()) {char c=abbr.charAt(j);if(Character.isDigit(c)) {if(c=='0') return false;long count=0;while(j<abbr.length()&&Character.isDigit(abbr.charAt(j))) count=count*10+abbr.charAt(j++)-'0';if(count>word.length()-i) return false;i+=(int)count;}else {if(i>=word.length()||word.charAt(i)!=c) return false;i++;j++;}}return i==word.length();}
}
