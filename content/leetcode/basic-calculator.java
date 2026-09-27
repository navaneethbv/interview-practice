class Solution {
public int calculate(String s){int total=0,sign=1,num=0;Deque<int[]>stack=new ArrayDeque<>();for(char c:s.toCharArray())if(Character.isDigit(c))num=num*10+c-'0';else if(c=='+'||c=='-'){total+=sign*num;num=0;sign=c=='+'?1:-1;}else if(c=='('){stack.push(new int[]{total,sign});total=0;sign=1;}else if(c==')'){total+=sign*num;num=0;int[]p=stack.pop();total=p[0]+p[1]*total;}return total+sign*num;}
}
