class Solution {
public String removeDuplicates(String s){StringBuilder b=new StringBuilder();for(char c:s.toCharArray())if(b.length()>0&&b.charAt(b.length()-1)==c)b.setLength(b.length()-1);else b.append(c);return b.toString();}
}
