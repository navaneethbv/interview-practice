class Solution {
public String decodeString(String s){Deque<Integer>counts=new ArrayDeque<>();Deque<StringBuilder>prefixes=new ArrayDeque<>();StringBuilder current=new StringBuilder();int n=0;for(char c:s.toCharArray())if(Character.isDigit(c))n=n*10+c-'0';else if(c=='['){counts.push(n);prefixes.push(current);current=new StringBuilder();n=0;}else if(c==']'){int count=counts.pop();String part=current.toString();current=prefixes.pop();while(count-->0)current.append(part);}else current.append(c);return current.toString();}
}
