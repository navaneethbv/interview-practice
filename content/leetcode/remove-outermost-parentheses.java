class Solution {
public String removeOuterParentheses(String s) {int depth=0;StringBuilder out=new StringBuilder();for(char c:s.toCharArray()) {if(c==')') depth--;if(depth>0) out.append(c);if(c=='(') depth++;}return out.toString();}
}
