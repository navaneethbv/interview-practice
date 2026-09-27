class Solution {
    public String toLowerCase(String s){StringBuilder out=new StringBuilder();for(char c:s.toCharArray())out.append(c>='A'&&c<='Z'?(char)(c+32):c);return out.toString();}
}
