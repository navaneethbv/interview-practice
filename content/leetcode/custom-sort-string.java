class Solution {
public String customSortString(String order,String s){int[]count=new int[26];for(char c:s.toCharArray())count[c-'a']++;StringBuilder out=new StringBuilder();for(char c:order.toCharArray()){while(count[c-'a']>0){out.append(c);count[c-'a']--;}}for(int i=0;i<26;i++)while(count[i]-->0)out.append((char)('a'+i));return out.toString();}
}
