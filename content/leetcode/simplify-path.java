class Solution {
public String simplifyPath(String path) {Deque<String> stack=new ArrayDeque<>();for(String p:path.split("/")) {if(p.isEmpty()||p.equals(".")) continue;if(p.equals("..")) {if(!stack.isEmpty()) stack.removeLast();}else stack.addLast(p);}return "/"+String.join("/",stack);}
}
