class Solution {
public String minRemoveToMakeValid(String s){Deque<Integer>open=new ArrayDeque<>();boolean[]remove=new boolean[s.length()];for(int i=0;i<s.length();i++)if(s.charAt(i)=='(')open.push(i);else if(s.charAt(i)==')'){if(open.isEmpty())remove[i]=true;else open.pop();}while(!open.isEmpty())remove[open.pop()]=true;StringBuilder b=new StringBuilder();for(int i=0;i<s.length();i++)if(!remove[i])b.append(s.charAt(i));return b.toString();}
}
