class Solution {
public boolean backspaceCompare(String s,String t){return typed(s).equals(typed(t));}private String typed(String s){StringBuilder b=new StringBuilder();for(char c:s.toCharArray())if(c=='#'){if(b.length()>0)b.setLength(b.length()-1);}else b.append(c);return b.toString();}
}
