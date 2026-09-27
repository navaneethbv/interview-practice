class Solution {
public NestedInteger deserialize(String s){if(s.charAt(0)!='[')return new NestedInteger(Integer.parseInt(s));ArrayDeque<NestedInteger> st=new ArrayDeque<>();for(int i=0;i<s.length();){char c=s.charAt(i);if(c=='['){NestedInteger v=new NestedInteger();if(!st.isEmpty())st.peek().add(v);st.push(v);i++;}else if(c==']'){NestedInteger v=st.pop();i++;if(st.isEmpty())return v;}else if(c==',')i++;else{int j=i+1;while(j<s.length()&&Character.isDigit(s.charAt(j)))j++;st.peek().add(new NestedInteger(Integer.parseInt(s.substring(i,j))));i=j;}}return new NestedInteger();}
}
