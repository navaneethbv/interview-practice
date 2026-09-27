class Solution {
private boolean valid(String s) {int b=0;for(char c:s.toCharArray()) {if(c=='(') b++;else if(c==')'&&--b<0) return false;}return b==0;}
public List<String> removeInvalidParentheses(String s) {
    Set<String> level=new HashSet<>();level.add(s);
    while(true) {List<String> out=new ArrayList<>();for(String text:level) if(valid(text)) out.add(text);if(!out.isEmpty()) return out;
        Set<String> next=new HashSet<>();for(String text:level) for(int i=0;i<text.length();i++) if(text.charAt(i)=='('||text.charAt(i)==')') next.add(text.substring(0,i)+text.substring(i+1));level=next;
    }
}
}
