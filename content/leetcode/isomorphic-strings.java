class Solution {
public boolean isIsomorphic(String s,String t) {Map<Character,Character> a=new HashMap<>(),b=new HashMap<>();for(int i=0;i<s.length();i++) {char x=s.charAt(i),y=t.charAt(i);if(a.containsKey(x)&&a.get(x)!=y||b.containsKey(y)&&b.get(y)!=x) return false;a.put(x,y);b.put(y,x);}return true;}
}
